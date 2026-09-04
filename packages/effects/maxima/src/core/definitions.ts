export type EffectParameters = {
  level: number;
};

export const defaultEffectParameters: EffectParameters = {
  level: 0,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
