import { ChannelId, EffectParameters } from "@/core/definitions";

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};

export type MeterState = {
  rmsDb: number;
  peakDb: number;
  holdDb: number;
};

export type MeterListener = (state: MeterState) => void;

export type AudioAnalysisEngine = {
  setup(): void;
  cleanup(): void;
  setDrawingActive(active: boolean): void;
  setBpm(bpm: number): void;
  setBarLength(bars: number): void;
  setWaveCanvas(id: ChannelId, canvas: HTMLCanvasElement | null): void;
  subscribeUi(fn: (patch: { hostBpm?: number }) => void): () => void;
  hostStarted(): void;
  subscribeMeter(id: ChannelId, fn: MeterListener): () => void;
};
