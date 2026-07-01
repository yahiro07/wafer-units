export type EffectParameters = {
  isOn: boolean;
  age: number; // 0~1 (ワウフラッターの深さ & フィルターのベース)
  grit: number; // 0~1 (サチュレーションの突っ込み量)
  degrade: number; // 0~1 (ビットクラッシュ・ダウンサンプリング)
  saturationMode: number; // 0: Tube, 1: Tape, 2: Transistor
  toneColor: number; // 0~1 (0: Dark ~ 1: Bright)
  dust: number; // 0~1 (ノイズの音量)
  noiseStuffIndex: number; // 0,1,2,3...
};

export const defaultEffectParameters: EffectParameters = {
  isOn: true,
  age: 0.5,
  grit: 0.5,
  degrade: 0.5,
  saturationMode: 0,
  toneColor: 0.5,
  dust: 0.5,
  noiseStuffIndex: 0,
};

export const noiseStuffUrls = [
  ".local/520709__lartti__hum.wav",
  ".local/859227__gm_isaac__vhs-tape-hiss.wav",
];
