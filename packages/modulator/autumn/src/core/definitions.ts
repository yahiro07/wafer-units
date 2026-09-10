export type Waveform = "ramp" | "tri" | "sine" | "rect" | "sh";

export const allWaveforms: Waveform[] = ["ramp", "tri", "sine", "rect", "sh"];

export type LoopBars = 0.125 | 0.25 | 0.5 | 1 | 2 | 4 | 8 | 16 | 32;

export const allLoopBars: LoopBars[] = [0.125, 0.25, 0.5, 1, 2, 4, 8, 16, 32];

export type EffectParameters = {
  loopBars: LoopBars;
  waveform: Waveform;
  xOffset: number;
  curve: number;
  v1: number;
  v2: number;
};

export const defaultEffectParameters: EffectParameters = {
  loopBars: 1,
  waveform: "ramp",
  xOffset: 0,
  curve: 0,
  v1: 0,
  v2: 1,
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
