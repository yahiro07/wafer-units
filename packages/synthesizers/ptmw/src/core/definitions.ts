export type SynthParameters = {
  wave: number;
  shape: number;
};
export type SynthParameterKey = keyof SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  wave: 0,
  shape: 0,
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  cleanup(): void;
};
