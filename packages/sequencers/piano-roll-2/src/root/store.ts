import { createStore } from "snap-store";

export const store = createStore<{
  octave: number;
  duty: number;
  playPos: number | null;
  loopBars: number;
}>({
  octave: 0,
  duty: 0.5,
  playPos: null,
  loopBars: 1,
});

export const actions = {};
