export type RateDivision = 64 | 32 | 16 | 8 | 4;

export type EffectParameters = {
  isOn: boolean;
  rate: RateDivision;
  feed: number;
  mix: number;
};
