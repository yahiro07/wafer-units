export enum WaveMode {
  PD = 0,
  FM = 1,
  FM_FB = 2,
  PD_RESO = 3,
}

// AudioParamの最小・最大・デフォルト定義
// export const SYNTH_PARAMS = [
//   { name: "waveMode", default: 0, min: 0, max: 3 },
//   { name: "shape", default: 0.0, min: 0.0, max: 1.0 },
//   { name: "envMod", default: 0.0, min: 0.0, max: 1.0 },
//   { name: "detune", default: 0.0, min: 0.0, max: 1.0 }, // 0でシングル, >0でデチューン比
//   { name: "sub", default: 0.0, min: 0.0, max: 1.0 }, // サブOSC（三角波）の音量
//   { name: "decay", default: 0.5, min: 0.001, max: 1.0 },
//   { name: "release", default: 0.3, min: 0.001, max: 1.0 },
//   { name: "drift", default: 0.0, min: 0.0, max: 1.0 }, // ピッチの不安定さ
//   { name: "loFi", default: 0.0, min: 0.0, max: 1.0 }, // ローファイ量
// ];
