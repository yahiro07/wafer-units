export type EffectParameters = {
  inputGain: number;
  threshold: number;
  ratio: number;
  knee: number;
  attack: number;
  release: number;
  outputGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  inputGain: 0.5,
  threshold: 1,
  ratio: 0,
  knee: 0,
  attack: 0,
  release: 0,
  outputGain: 0.5,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
