import { getUnitInterface } from "wus-unit-types";
import { createChorusModule } from "@/audio/create-chorus-module";
import { createReverbModule } from "@/audio/create-reverb-module";
import {
  cloneSynthParameters,
  defaultSynthParameters,
} from "@/audio/default-parameters";
import type { SynthParameters } from "@/audio/types";
import {
  clampValue,
  linearInterpolate,
  mapUnaryTo,
} from "@/utils/number-utils";

export const unitInterface = getUnitInterface("wus-v02");

const allWaveTypes: OscillatorType[] = [
  "sawtooth",
  "square",
  "triangle",
  "sine",
];

type Voice = {
  noteNumber: number;
  outputNode: GainNode;
  filterNode: BiquadFilterNode;
  ampNode: GainNode;
  oscMain: OscillatorNode;
  oscDetuned: OscillatorNode;
  oscSub: OscillatorNode;
  oscDetunedGain: GainNode;
  oscSubGain: GainNode;
  driftLfoNode: OscillatorNode;
  driftLfoGainMain: GainNode;
  driftLfoGainDetuned: GainNode;
  released: boolean;
  velocity: number;
};

function midiNoteToFrequency(noteNumber: number) {
  return 440 * Math.pow(2, (noteNumber - 69) / 12);
}

function getWaveType(oscWave: number): OscillatorType {
  const index = Math.round(clampValue(oscWave, 0, 3));
  return allWaveTypes[index];
}

function getFilterCutoffFrequency(cutoff: number) {
  return mapUnaryTo(cutoff, 80, 12000);
}

function getDetuneCents(oscDetune: number) {
  return mapUnaryTo(oscDetune, 0, 26);
}

function getDriftDepthCents(oscDrift: number) {
  return mapUnaryTo(oscDrift, 0, 12);
}

function getAmpDecayTimeSec(ampDecay: number) {
  if (ampDecay >= 0.999) return 0.01;
  return linearInterpolate(ampDecay, 0, 1, 0.08, 2.4, true);
}

function getAmpReleaseTimeSec(ampRelease: number) {
  return linearInterpolate(ampRelease, 0, 1, 0.02, 2.6, true);
}

function getFilterEnvDecaySec(ampDecay: number) {
  return linearInterpolate(ampDecay, 0, 1, 0.06, 1.4, true);
}

function createVoice(
  audioContext: AudioContext,
  parameters: SynthParameters,
  noteNumber: number,
  velocity: number,
) {
  const now = audioContext.currentTime;
  const frequency = midiNoteToFrequency(noteNumber);

  const outputNode = audioContext.createGain();
  const mixNode = audioContext.createGain();
  const ampNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();

  const oscMain = audioContext.createOscillator();
  const oscDetuned = audioContext.createOscillator();
  const oscSub = audioContext.createOscillator();

  const oscMainGain = audioContext.createGain();
  const oscDetunedGain = audioContext.createGain();
  const oscSubGain = audioContext.createGain();

  const driftLfoNode = audioContext.createOscillator();
  const driftLfoGainMain = audioContext.createGain();
  const driftLfoGainDetuned = audioContext.createGain();

  filterNode.type = "lowpass";
  ampNode.gain.value = 0;

  oscMain.connect(oscMainGain);
  oscDetuned.connect(oscDetunedGain);
  oscSub.connect(oscSubGain);

  oscMainGain.connect(mixNode);
  oscDetunedGain.connect(mixNode);
  oscSubGain.connect(mixNode);

  mixNode.connect(filterNode);
  filterNode.connect(ampNode);
  ampNode.connect(outputNode);

  driftLfoNode.type = "sine";
  driftLfoNode.frequency.value = 0.24;
  driftLfoNode.connect(driftLfoGainMain);
  driftLfoNode.connect(driftLfoGainDetuned);
  driftLfoGainMain.connect(oscMain.detune);
  driftLfoGainDetuned.connect(oscDetuned.detune);

  oscMain.frequency.value = frequency;
  oscDetuned.frequency.value = frequency;
  oscSub.frequency.value = frequency / 2;

  oscSub.type = "triangle";

  const voice: Voice = {
    noteNumber,
    outputNode,
    filterNode,
    ampNode,
    oscMain,
    oscDetuned,
    oscSub,
    oscDetunedGain,
    oscSubGain,
    driftLfoNode,
    driftLfoGainMain,
    driftLfoGainDetuned,
    released: false,
    velocity,
  };

  updateVoiceParameters(audioContext, voice, parameters);

  const ampPeak = clampValue(0.22 + velocity * 0.6, 0.2, 1);
  ampNode.gain.cancelScheduledValues(now);
  ampNode.gain.setValueAtTime(0, now);
  ampNode.gain.linearRampToValueAtTime(ampPeak, now + 0.01);

  const sustain = parameters.ampDecay >= 0.999 ? ampPeak : 0;
  const ampDecayTime = getAmpDecayTimeSec(parameters.ampDecay);
  if (sustain !== ampPeak) {
    ampNode.gain.setTargetAtTime(sustain, now + 0.01, ampDecayTime / 3.5);
  }

  const baseCutoff = getFilterCutoffFrequency(parameters.filterCutoff);
  const envAmount = mapUnaryTo(parameters.filterEnvMod, 0, 9000);
  const envPeak = Math.min(baseCutoff + envAmount, 16000);
  filterNode.frequency.cancelScheduledValues(now);
  filterNode.frequency.setValueAtTime(baseCutoff, now);
  filterNode.frequency.linearRampToValueAtTime(envPeak, now + 0.005);
  filterNode.frequency.setTargetAtTime(
    baseCutoff,
    now + 0.005,
    getFilterEnvDecaySec(parameters.ampDecay) / 3.2,
  );

  oscMain.start(now);
  oscDetuned.start(now);
  oscSub.start(now);
  driftLfoNode.start(now);

  return voice;
}

function updateVoiceParameters(
  audioContext: AudioContext,
  voice: Voice,
  parameters: SynthParameters,
) {
  const now = audioContext.currentTime;
  const waveType = getWaveType(parameters.oscWave);

  voice.oscMain.type = waveType;
  voice.oscDetuned.type = waveType;

  const detuneCents = getDetuneCents(parameters.oscDetune);
  voice.oscDetuned.detune.setTargetAtTime(detuneCents, now, 0.02);

  const detunedGain = parameters.oscDetune > 0 ? 0.55 : 0;
  voice.oscDetunedGain.gain.setTargetAtTime(detunedGain, now, 0.02);
  voice.oscSubGain.gain.setTargetAtTime(parameters.oscSub * 0.7, now, 0.02);

  const driftDepth = getDriftDepthCents(parameters.oscDrift);
  voice.driftLfoGainMain.gain.setTargetAtTime(driftDepth, now, 0.03);
  voice.driftLfoGainDetuned.gain.setTargetAtTime(driftDepth * 1.2, now, 0.03);
  voice.driftLfoNode.frequency.setTargetAtTime(
    linearInterpolate(parameters.oscDrift, 0, 1, 0.12, 0.45, true),
    now,
    0.03,
  );

  voice.filterNode.frequency.setTargetAtTime(
    getFilterCutoffFrequency(parameters.filterCutoff),
    now,
    0.03,
  );
  voice.filterNode.Q.setTargetAtTime(
    mapUnaryTo(parameters.filterPeak, 0.3, 22),
    now,
    0.03,
  );
}

function releaseVoice(
  audioContext: AudioContext,
  voice: Voice,
  parameters: SynthParameters,
  onEnded: () => void,
) {
  if (voice.released) return;
  voice.released = true;

  const now = audioContext.currentTime;
  const releaseSec = getAmpReleaseTimeSec(parameters.ampRelease);

  voice.ampNode.gain.cancelScheduledValues(now);
  voice.ampNode.gain.setValueAtTime(
    Math.max(voice.ampNode.gain.value, 0.0001),
    now,
  );
  voice.ampNode.gain.setTargetAtTime(0.0001, now, releaseSec / 4);

  const stopTime = now + releaseSec * 1.3;
  voice.oscMain.stop(stopTime);
  voice.oscDetuned.stop(stopTime);
  voice.oscSub.stop(stopTime);
  voice.driftLfoNode.stop(stopTime);

  setTimeout(onEnded, releaseSec * 1400);
}

export function createMiniSynthAudio() {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destNode =
    unitInterface?.primaryOutputPort.audioOutput.node ??
    audioContext.destination;

  const outputNode = audioContext.createGain();
  const voiceBusNode = audioContext.createGain();

  const chorusModule = createChorusModule(audioContext);
  const reverbModule = createReverbModule(audioContext);

  voiceBusNode.connect(chorusModule.inputNode);
  chorusModule.outputNode.connect(reverbModule.inputNode);
  reverbModule.outputNode.connect(outputNode);
  outputNode.connect(destNode);

  const activeVoices = new Map<number, Voice>();

  let currentParameters = cloneSynthParameters(defaultSynthParameters);

  function updateParameters(parameters: SynthParameters) {
    currentParameters = cloneSynthParameters(parameters);
    chorusModule.updateNodeParameters({ amount: currentParameters.fxChorus });
    reverbModule.updateNodeParameters({ amount: currentParameters.fxReverb });
    outputNode.gain.setTargetAtTime(
      currentParameters.ampMaster,
      audioContext.currentTime,
      0.03,
    );

    activeVoices.forEach((voice) => {
      updateVoiceParameters(audioContext, voice, currentParameters);
    });
  }

  function noteOn(noteNumber: number, velocity: number) {
    noteOff(noteNumber);

    const voice = createVoice(
      audioContext,
      currentParameters,
      noteNumber,
      velocity,
    );
    voice.outputNode.connect(voiceBusNode);
    activeVoices.set(noteNumber, voice);
  }

  function noteOff(noteNumber: number) {
    const voice = activeVoices.get(noteNumber);
    if (!voice) return;

    activeVoices.delete(noteNumber);

    releaseVoice(audioContext, voice, currentParameters, () => {
      voice.outputNode.disconnect();
      if (activeVoices.get(noteNumber) === voice) {
        activeVoices.delete(noteNumber);
      }
    });
  }

  function allNotesOff() {
    Array.from(activeVoices.keys()).forEach((noteNumber) => {
      noteOff(noteNumber);
    });
  }

  updateParameters(currentParameters);

  return {
    audioContext,
    updateParameters,
    noteOn,
    noteOff,
    allNotesOff,
  };
}
