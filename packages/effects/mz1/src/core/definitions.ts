export type EffectParameters = {
  inputGain: number;
  compThreshold: number;
  compAttack: number;
  compRelease: number;
  drive: number;
  limit: number;
  outputGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  inputGain: 0.5,
  compThreshold: 1,
  compAttack: 0,
  compRelease: 0,
  drive: 0,
  limit: 0,
  outputGain: 0.5,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
