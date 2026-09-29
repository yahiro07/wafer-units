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
  threshold: 0.5,
  ratio: 0.38,
  knee: 0,
  attack: 0,
  release: 0,
  outputGain: 0.5,
};
