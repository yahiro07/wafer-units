export type SynthParameters = {
  volume: number;
  pan: number;
};
export type SynthParameterKey = keyof SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  volume: 0.5,
  pan: 0,
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  cleanup(): void;
};
