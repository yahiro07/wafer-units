import { UnitInterface } from "wafer-host/unit-types";
import {
  defaultEffectParameters,
  SamplerEngine,
  SamplerParameters,
} from "@/core/definitions";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";
import { power2 } from "@lib/mu2609/utils/synth-math-utils";

const ROOT_NOTE = 60;
const MAX_RELEASE_SECONDS = 4;
const RELEASE_TAIL_GAIN = 1e-3;

type Voice = {
  source: AudioBufferSourceNode;
  gain: GainNode;
};

function stopVoice(voice: Voice, time?: number) {
  try {
    if (time !== undefined) {
      voice.source.stop(time);
    } else {
      voice.source.stop();
    }
  } catch {
    // already stopped
  }
}

function disconnectVoice(voice: Voice) {
  voice.source.disconnect();
  voice.gain.disconnect();
}

export function createSamplerEngine(
  unitInterface: UnitInterface | undefined,
): SamplerEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const outputGainNode = ac.createGain();
  outputGainNode.connect(destinationNode);

  let sampleBuffer: AudioBuffer | undefined;
  let loadGeneration = 0;
  let parameters: SamplerParameters = { ...defaultEffectParameters };
  const voices = new Map<number, Voice>();

  function resolveTime(time: number | undefined) {
    return Math.max(time ?? 0, ac.currentTime);
  }

  function disposeVoice(noteNumber: number, voice: Voice) {
    if (voices.get(noteNumber) === voice) {
      voices.delete(noteNumber);
    }
    disconnectVoice(voice);
  }

  function killVoice(noteNumber: number) {
    const voice = voices.get(noteNumber);
    if (!voice) return;
    stopVoice(voice);
    disposeVoice(noteNumber, voice);
  }

  function killAllVoices() {
    for (const [noteNumber, voice] of voices) {
      stopVoice(voice);
      disconnectVoice(voice);
      voices.delete(noteNumber);
    }
  }

  return {
    loadSampleFile(file) {
      const generation = ++loadGeneration;
      void (async () => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = await ac.decodeAudioData(arrayBuffer);
          if (generation !== loadGeneration) return;
          sampleBuffer = buffer;
          console.log("sample file loaded", file.name, buffer.duration + "sec");
        } catch (err) {
          // ignore failed loads
          console.error("failed to load sample file", err);
        }
      })();
    },
    setParameters(pr) {
      parameters = pr;
      outputGainNode.gain.value = mapKnobCurveCenterUnity(pr.volume);
    },
    cleanup() {
      killAllVoices();
      outputGainNode.disconnect();
    },
    noteOn(noteNumber, time) {
      if (!sampleBuffer) return;
      killVoice(noteNumber);

      const tOn = resolveTime(time);
      const playbackRate =
        2 ** ((noteNumber - ROOT_NOTE + parameters.noteShift) / 12);

      const source = ac.createBufferSource();
      source.buffer = sampleBuffer;
      source.playbackRate.value = playbackRate;

      const gain = ac.createGain();
      gain.gain.value = 1;
      source.connect(gain);
      gain.connect(outputGainNode);

      const voice: Voice = { source, gain };
      voices.set(noteNumber, voice);
      source.onended = () => {
        disposeVoice(noteNumber, voice);
      };
      source.start(tOn);
    },
    noteOff(noteNumber, time) {
      const voice = voices.get(noteNumber);
      if (!voice) return;

      const tOff = resolveTime(time);
      const release = parameters.release;

      if (release >= 1) {
        stopVoice(voice, tOff + MAX_RELEASE_SECONDS);
        return;
      }

      if (release <= 0) {
        voice.gain.gain.setValueAtTime(0, tOff);
        stopVoice(voice, tOff);
        return;
      }

      const releaseTime = power2(release) * MAX_RELEASE_SECONDS;
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, tOff);
      voice.gain.gain.exponentialRampToValueAtTime(
        RELEASE_TAIL_GAIN,
        tOff + releaseTime,
      );
      stopVoice(voice, tOff + releaseTime);
    },
  };
}
