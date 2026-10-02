export type OscParameters = {
  wave: number;
  shape: number;
  dense: number;
  mix: number;
};
export type OscParameterKey = keyof OscParameters;

export type SynthParameters = {
  osc1: OscParameters;
  osc2: OscParameters;
};
export type SynthParameterKey = keyof SynthParameters;

export type OscId = "osc1" | "osc2";

export const defaultSynthParameters: SynthParameters = {
  osc1: {
    wave: 0,
    shape: 0,
    dense: 0.5,
    mix: 1,
  },
  osc2: {
    wave: 1,
    shape: 0,
    dense: 0.5,
    mix: 1,
  },
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  cleanup(): void;
};
