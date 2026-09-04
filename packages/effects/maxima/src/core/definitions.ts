export type EffectParameters = {
  drive: number;
  ceiling: number;
  lookahead: number;
  outputGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  drive: 0,
  ceiling: -1,
  lookahead: 5,
  outputGain: 0.5,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
