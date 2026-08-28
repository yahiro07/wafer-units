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
  lane3: {
    octave: "osc3Octave",
    wave: "osc3Wave",
    unison: "osc3Unison",
    spread: "osc3Spread",
    detune: "osc3Detune",
    decay: "osc3Decay",
    sub: "osc3Sub",
    mix: "osc3Mix",
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
  lane3: {
    type: "filter3Type",
    cutoff: "filter3Cutoff",
    peak: "filter3Peak",
    env: "filter3Env",
  },
} as const;

export const ampParameterKeys = {
  lane1: {
    decayAltAttack: "amp1DecayAltAttack",
    decay: "amp1Decay",
    release: "amp1Release",
  },
  lane2: {
    decayAltAttack: "amp2DecayAltAttack",
    decay: "amp2Decay",
    release: "amp2Release",
  },
  lane3: {
    decayAltAttack: "amp3DecayAltAttack",
    decay: "amp3Decay",
    release: "amp3Release",
  },
} as const;

export const laneParameterKeys = {
  lane1: {
    on: "lane1On",
    volume: "lane1Volume",
  },
  lane2: {
    on: "lane2On",
    volume: "lane2Volume",
  },
  lane3: {
    on: "lane3On",
    volume: "lane3Volume",
  },
} as const;
