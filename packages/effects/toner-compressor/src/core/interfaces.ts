import {
  ChannelId,
  EffectParameters,
  MeterChannelId,
} from "@/core/definitions";

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  setBypass(bypass: boolean): void;
  setSideChain(sideChain: boolean): void;
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
  subscribeMeter(id: MeterChannelId, fn: MeterListener): () => void;
};
