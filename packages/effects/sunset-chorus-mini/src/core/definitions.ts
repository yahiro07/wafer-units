export type ChorusType = 1 | 2 | 3 | 4 | 5;

export type EffectParameters = {
  isOn: boolean;
  chorusType: ChorusType;
  chorusLevel: number;
};

export const defaultEffectParameters: EffectParameters = {
  isOn: true,
  chorusType: 1,
  chorusLevel: 0.5,
};
