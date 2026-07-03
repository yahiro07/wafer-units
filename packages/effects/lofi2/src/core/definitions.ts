export type EffectParameters = {
  isOn: boolean;
  //linear parameters are ranged in 0~1
  banded: number;
  hi: number;
  degrade: number;
  drive: number;
  noise: number;
  wobble: number;
  mix: number;
};

export const defaultEffectParameters: EffectParameters = {
  isOn: true,
  banded: 0,
  hi: 0,
  degrade: 0,
  drive: 0,
  noise: 0,
  wobble: 0,
  mix: 0.5,
};
