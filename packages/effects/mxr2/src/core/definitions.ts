export type EffectParameters = {
  compThreshold: number;
  compRatio: number;
  compKnee: number;
  compAttack: number;
  compRelease: number;
  makeupGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  compThreshold: 1,
  compRatio: 0,
  compKnee: 0,
  compAttack: 0,
  compRelease: 0,
  makeupGain: 0.5,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
