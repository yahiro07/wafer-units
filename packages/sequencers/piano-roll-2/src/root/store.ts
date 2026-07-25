import { createStore } from "snap-store";
import { Note } from "@/root/model";

export const store = createStore<{
  octave: number;
  duty: number;
  playPos: number | null;
  loopBars: number;
  pageIndex: number;
  notes: Note[];
}>({
  octave: 0,
  duty: 0.5,
  playPos: null,
  loopBars: 1,
  pageIndex: 0,
  notes: [],
});

export const actions = {};
