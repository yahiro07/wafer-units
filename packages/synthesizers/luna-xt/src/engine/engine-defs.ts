import { SynthParameters } from "@/defs/definitions";

export const engineConfig = {
  numVoiceMax: 4,
};

export type SynthesisBus = {
  audioContext: AudioContext;
  parameters: SynthParameters;
};

export const oscParameterKeys = {
  osc1: {
    octave: "osc1Octave",
    wave: "osc1Wave",
    unison: "osc1Unison",
    spread: "osc1Spread",
    detune: "osc1Detune",
    decay: "osc1Decay",
  },
  osc2: {
    octave: "osc2Octave",
    wave: "osc2Wave",
    unison: "osc2Unison",
    spread: "osc2Spread",
    detune: "osc2Detune",
    decay: "osc2Decay",
  },
} as const;
