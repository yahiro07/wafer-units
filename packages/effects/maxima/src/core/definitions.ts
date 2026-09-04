export type EffectParameters = {
  drive: number;
  curve: number;
  ceiling: number;
  lookahead: number;
  outputGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  drive: 0,
  curve: 0,
  ceiling: -1,
  lookahead: 25,
  outputGain: 0.5,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
