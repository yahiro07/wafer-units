import { createStore } from "snap-store";

export const store = createStore<{
  octave: number;
  duty: number;
  playPos: number | null;
  loopBars: number;
  pageIndex: number;
}>({
  octave: 0,
  duty: 0.5,
  playPos: null,
  loopBars: 1,
  pageIndex: 0,
});

export const actions = {};
