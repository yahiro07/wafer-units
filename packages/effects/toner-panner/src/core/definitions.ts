export type SynthParameters = {
  pan: number;
};
export type SynthParameterKey = keyof SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  pan: 0,
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  cleanup(): void;
};
