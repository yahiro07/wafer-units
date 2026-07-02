export type EffectParameters = {
  isOn: boolean;
  age: number; // 0~1 (ワウフラッターの深さ & フィルターのベース)
  grit: number; // 0~1 (サチュレーションの突っ込み量)
  degrade: number; // 0~1 (ビットクラッシュ・ダウンサンプリング)
  saturationMode: number; // 0: Tube, 1: Tape, 2: Transistor
  toneColor: number; // 0~1 (0: Dark ~ 1: Bright)
};

export const defaultEffectParameters: EffectParameters = {
  isOn: true,
  age: 0,
  grit: 0.25,
  degrade: 0,
  saturationMode: 0,
  toneColor: 0.5,
};
