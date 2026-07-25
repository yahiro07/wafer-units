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

if (1) {
  store.setNotes([
    { id: 0, position: 0, duration: 2, pitch: 14 },
    { id: 1, position: 2, duration: 2, pitch: 15 },
    { id: 2, position: 4, duration: 2, pitch: 16 },
    { id: 3, position: 6, duration: 2, pitch: 17 },
    { id: 4, position: 8, duration: 2, pitch: 17 },
    { id: 5, position: 16, duration: 8, pitch: 17 },
    { id: 6, position: 32, duration: 16, pitch: 14 },
  ]);
}

export const actions = {};
