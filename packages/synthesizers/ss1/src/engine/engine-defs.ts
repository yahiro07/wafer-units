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
    shape: "osc1Shape",
    spread: "osc1Spread",
    detune: "osc1Detune",
    decay: "osc1Decay",
    sub: "osc1Sub",
    mix: "osc1Mix",
  },
} as const;

export const filterParameterKeys = {
  lane1: {
    type: "filter1Type",
    cutoff: "filter1Cutoff",
    peak: "filter1Peak",
    env: "filter1Env",
  },
} as const;

export const ampParameterKeys = {
  lane1: {
    full: "amp1Full",
    attack: "amp1Attack",
    decay: "amp1Decay",
    sustain: "amp1Sustain",
    release: "amp1Release",
  },
} as const;

export const laneParameterKeys = {
  lane1: {
    on: "lane1On",
    volume: "lane1Volume",
  },
} as const;
