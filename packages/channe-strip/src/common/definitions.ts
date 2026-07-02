export type EffectParameters = {
  outputOn: boolean;
  effectOn: boolean;
  volume: number; // 0~1, center(0.5) is unity(1) gain
  pan: number; // -1~1
  haas: number; // 0~1
  lowCut: number; // 0~1
  eqLow: number; // 0~1
  eqMid: number; // 0~1
  eqHigh: number; // 0~1
  compress: number; // 0~1
};

export const defaultEffectParameters: EffectParameters = {
  outputOn: true,
  effectOn: true,
  volume: 0.5,
  pan: 0,
  haas: 0,
  lowCut: 0,
  eqLow: 0.5,
  eqMid: 0.5,
  eqHigh: 0.5,
  compress: 0,
};
