import {
  defaultSynthParameters,
  ISynthesizer,
  SynthParameters,
} from "@/defs/definitions";
import { createEffectChain } from "@/engine/effect-chain";
import { createPolyVoice, PolyVoice } from "@/engine/poly-voice";
import { createSineLfo } from "@/engine/sine-lfo";
import { UnitInterface } from "wafer-host/unit-types";

const MAX_POLY_VOICES = 4;
const MAX_PITCH_LFO_CENTS = 100;

const MIX_KEYS: (keyof SynthParameters)[] = [
  "osc1Wave",
  "oscDetune",
  "osc2Wave",
  "osc2Volume",
  "attackAltPunch",
];
const PITCH_KEYS: (keyof SynthParameters)[] = [
  "voiceOctave",
  "osc2Octave",
  "oscDetune",
  "osc1Wave",
];
const ENVELOPE_KEYS: (keyof SynthParameters)[] = [
  "ampAttack",
  "ampDecay",
  "ampSustain",
  "ampRelease",
  "attackAltPunch",
  "osc1Wave",
  "osc2Wave",
  "osc2Volume",
  "pitchLfoAltPitchEg",
  "pitchLfoDepth",
];
const PITCH_LFO_KEYS: (keyof SynthParameters)[] = [
  "pitchLfoRate",
  "pitchLfoDepth",
  "pitchLfoAltPitchEg",
];
const EFFECT_KEYS: (keyof SynthParameters)[] = [
  "hpfCutoff",
  "hpfQ",
  "lpfCutoff",
  "lpfQ",
  "lpfSteep",
  "lpfEnvMod",
  "filterLfoRate",
  "filterLfoDepth",
  "density",
  "chorusLevel",
  "reverbDecay",
  "reverbMix",
  "reverbDamp",
  "presence",
  "globalVolume",
  "voiceOctave",
  "osc2Octave",
];

function hasAny(
  patch: Partial<SynthParameters>,
  keys: (keyof SynthParameters)[],
) {
  return keys.some((key) => key in patch);
}

function createNoiseBuffer(audioContext: AudioContext): AudioBuffer {
  const length = audioContext.sampleRate * 0.5;
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
  const pitchLfo = createSineLfo(audioContext);
  const voices: PolyVoice[] = [];
  for (let i = 0; i < MAX_POLY_VOICES; i += 1) {
    voices.push(
      createPolyVoice(audioContext, mix, noiseBuffer, pitchLfo.output),
    );
  }

  const effectChain = createEffectChain(audioContext, destination);
  mix.gain.value = 1 / Math.sqrt(MAX_POLY_VOICES);
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
  }

  function applyPatch(patch: Partial<SynthParameters>, time: number) {
    const parameters = state.parameters;
    if (hasAny(patch, MIX_KEYS)) {
      applyOscillatorMix(parameters, time);
    }
    if (hasAny(patch, PITCH_KEYS)) {
      applyHeldPitches(parameters, time);
    }
    if (hasAny(patch, EFFECT_KEYS)) {
      effectChain.apply(patch, parameters, time, state.lastNote);
    }
    if (hasAny(patch, PITCH_LFO_KEYS)) {
      pitchLfo.apply(
        parameters.pitchLfoRate,
        parameters.pitchLfoAltPitchEg
          ? 0
          : Math.min(1, Math.max(0, parameters.pitchLfoDepth ** 2)) *
              MAX_PITCH_LFO_CENTS,
        time,
      );
    }
    if (hasAny(patch, ENVELOPE_KEYS)) {
      applyEnvelopeParameters(parameters);
    }
  }

  function resolveTime(time?: number): number {
    return Math.max(time ?? 0, audioContext.currentTime);
  }

  applyPatch(state.parameters, audioContext.currentTime);

  return {
    affectParameters(patch) {
      if (Object.keys(patch).length === 0) return;
      Object.assign(state.parameters, patch);
      applyPatch(patch, audioContext.currentTime);
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
      effectChain.applyLpfFrequency(parameters, startTime, noteNumber);
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
      pitchLfo.cleanup();
      effectChain.cleanup();
    },
  };
}
