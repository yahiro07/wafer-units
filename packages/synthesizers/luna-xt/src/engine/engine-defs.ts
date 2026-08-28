import { SynthParameters } from "@/defs/definitions";

export const engineConfig = {
  numVoiceMax: 4,
};

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export const oscParameterKeys = {
  lane1: {
    octave: "osc1Octave",
    wave: "osc1Wave",
    unison: "osc1Unison",
    spread: "osc1Spread",
    detune: "osc1Detune",
    decay: "osc1Decay",
    sub: "osc1Sub",
    mix: "osc1Mix",
  },
  lane2: {
    octave: "osc2Octave",
    wave: "osc2Wave",
    unison: "osc2Unison",
    spread: "osc2Spread",
    detune: "osc2Detune",
    decay: "osc2Decay",
    sub: "osc2Sub",
    mix: "osc2Mix",
  },
} as const;

export const filterParameterKeys = {
  lane1: {
    type: "filter1Type",
    cutoff: "filter1Cutoff",
    peak: "filter1Peak",
    env: "filter1Env",
  },
  lane2: {
    type: "filter2Type",
    cutoff: "filter2Cutoff",
    peak: "filter2Peak",
    env: "filter2Env",
  },
} as const;

export const ampParameterKeys = {
  lane1: {
    decayAltAttack: "amp1DecayAltAttack",
    decay: "amp1Decay",
    release: "amp1Release",
    volume: "amp1Volume",
  },
  lane2: {
    decayAltAttack: "amp2DecayAltAttack",
    decay: "amp2Decay",
    release: "amp2Release",
    volume: "amp2Volume",
  },
} as const;
