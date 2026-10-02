export type SynthParameters = {
  wave: number;
  shape: number;
  dense: number;
  mix: number;
};
export type SynthParameterKey = keyof SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  wave: 0,
  shape: 0,
  dense: 0.5,
  mix: 1,
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  cleanup(): void;
};
