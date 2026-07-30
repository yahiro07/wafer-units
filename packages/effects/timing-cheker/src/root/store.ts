import { createStore } from "snap-store";

export const store = createStore<{
  barLength: number;
  hostBpm: number;
  schedulingPlotterCanvas: HTMLCanvasElement | null;
}>({
  barLength: 1,
  hostBpm: 0,
  schedulingPlotterCanvas: null,
});
