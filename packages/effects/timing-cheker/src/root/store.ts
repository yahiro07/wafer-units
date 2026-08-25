import { createStore } from "snap-store/preact";

export const store = createStore<{
  barLength: number;
  hostBpm: number;
  schedulingPlotterCanvas: HTMLCanvasElement | null;
  wavePlotterCanvasCh1: HTMLCanvasElement | null;
  notesPlotterCanvas: HTMLCanvasElement | null;
}>({
  barLength: 1,
  hostBpm: 0,
  schedulingPlotterCanvas: null,
  wavePlotterCanvasCh1: null,
  notesPlotterCanvas: null,
});
