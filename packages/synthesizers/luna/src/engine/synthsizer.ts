import {
  defaultSynthParameters,
  ISynthesizer,
  SynthParameters,
} from "@/defs/definitions";
import { createEffectChain } from "@/engine/effect-chain";
import {
  createPolyVoice,
  PolyVoice,
  resolveAttackAndPunch,
} from "@/engine/poly-voice";
import { UnitInterface } from "wafer-host/unit-types";

const MAX_POLY_VOICES = 4;

function createNoiseBuffer(audioContext: AudioContext): AudioBuffer {
  const length = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destination =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const noiseBuffer = createNoiseBuffer(audioContext);
  const mix = audioContext.createGain();
  const voices: PolyVoice[] = [];
  for (let i = 0; i < MAX_POLY_VOICES; i += 1) {
    voices.push(createPolyVoice(audioContext, mix, noiseBuffer));
  }

  const effectChain = createEffectChain(audioContext, destination);
  mix.gain.value = 1;
  mix.connect(effectChain.input);

  const state: {
    parameters: SynthParameters;
    lastNote: number;
    allocOrder: number;
    filterEnvVoice: PolyVoice | null;
  } = {
    parameters: { ...defaultSynthParameters },
    lastNote: 69,
    allocOrder: 0,
    filterEnvVoice: null,
  };

  function heldVoices(): PolyVoice[] {
    return voices.filter((voice) => voice.noteNumber !== null);
  }

  function allocateVoice(noteNumber: number): PolyVoice {
    const existing = voices.find((voice) => voice.noteNumber === noteNumber);
    if (existing) return existing;
    const free = voices.filter((voice) => voice.noteNumber === null);
    const idle = free.find((voice) => voice !== state.filterEnvVoice);
    if (idle) return idle;
    if (free[0]) return free[0];
    return voices.reduce((oldest, voice) =>
      voice.order < oldest.order ? voice : oldest,
    );
  }

  function routeFilterEnvelope(voice: PolyVoice) {
    if (state.filterEnvVoice === voice) return;
    state.filterEnvVoice?.envelopeNode.disconnect(effectChain.filterEnvScale);
    voice.envelopeNode.connect(effectChain.filterEnvScale);
    state.filterEnvVoice = voice;
  }

  function applyOscillatorMix(parameters: SynthParameters, time: number) {
    for (const voice of voices) {
      voice.applyMix(parameters, time, voice.noteNumber !== null);
    }
  }

  function applyHeldPitches(parameters: SynthParameters, time: number) {
    for (const voice of heldVoices()) {
      voice.applyPitch(voice.noteNumber as number, parameters, time);
    }
  }

  function applyEnvelopeParameters(parameters: SynthParameters) {
    for (const voice of voices) {
      voice.applyEnvelopeParameters(parameters);
    }
    const { punch } = resolveAttackAndPunch(parameters);
    effectChain.setPunchCurve(punch);
  }

  function applyParameters(parameters: SynthParameters, time: number) {
    applyOscillatorMix(parameters, time);
    applyHeldPitches(parameters, time);
    effectChain.apply(parameters, time, state.lastNote);
    applyEnvelopeParameters(parameters);
  }

  function resolveTime(time?: number): number {
    return Math.max(time ?? 0, audioContext.currentTime);
  }

  applyParameters(state.parameters, audioContext.currentTime);

  return {
    setParameters(parameters) {
      state.parameters = { ...parameters };
      applyParameters(state.parameters, audioContext.currentTime);
    },
    noteOn(noteNumber, time) {
      const startTime = resolveTime(time);
      const parameters = state.parameters;
      const voice = allocateVoice(noteNumber);
      voice.noteNumber = noteNumber;
      voice.order = ++state.allocOrder;
      state.lastNote = noteNumber;

      voice.applyPitch(noteNumber, parameters, startTime);
      voice.applyMix(parameters, startTime, true);
      routeFilterEnvelope(voice);
      effectChain.apply(parameters, startTime, noteNumber);
      voice.triggerAttack(parameters, startTime);
    },
    noteOff(noteNumber, time) {
      const voice = voices.find((slot) => slot.noteNumber === noteNumber);
      if (!voice) return;
      voice.noteNumber = null;
      voice.triggerRelease(resolveTime(time));
    },
    cleanup() {
      for (const voice of voices) {
        voice.stopSources();
      }
      for (const voice of voices) {
        voice.disconnect();
      }
      mix.disconnect();
      effectChain.cleanup();
    },
  };
}
