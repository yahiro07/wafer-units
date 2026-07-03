export type EffectParameters = {
  isOn: boolean;
  banded: number;
  hi: number;
  degrade: number;
};

export const defaultEffectParameters: EffectParameters = {
  isOn: true,
  banded: 0,
  hi: 0,
  degrade: 0,
};
