import { createStore } from "snap-store";
import { LoopBarLength, Note } from "@/root/model";

export const store = createStore<{
  octave: number;
  duty: number;
  playPos: number | null;
  loopBars: LoopBarLength;
  recordingBars: number;
  pageIndex: number;
  notes: Note[];
  previewNotePitch: number | null;
  keyboardNumKeys: number;
  channel: number;
}>({
  octave: 0,
  duty: 1,
  playPos: null,
  loopBars: 4,
  recordingBars: 4,
  pageIndex: 0,
  notes: [],
  previewNotePitch: null,
  keyboardNumKeys: 32,
  channel: 0,
});

if (1) {
  //debug
  const base = 48;
  store.setNotes([
    { id: 0, channel: 0, position: 0, duration: 2, pitch: base + 0 },
    { id: 1, channel: 0, position: 2, duration: 2, pitch: base + 2 },
    { id: 2, channel: 0, position: 4, duration: 2, pitch: base + 4 },
    { id: 3, channel: 0, position: 6, duration: 2, pitch: base + 5 },
    { id: 4, channel: 0, position: 8, duration: 2, pitch: base + 7 },
    { id: 5, channel: 0, position: 16, duration: 8, pitch: base + 9 },
    { id: 6, channel: 0, position: 32, duration: 16, pitch: base + 11 },
    { id: 7, channel: 0, position: 48, duration: 16, pitch: base + 12 },
    { id: 8, channel: 0, position: 64, duration: 16, pitch: base + 14 },
    { id: 9, channel: 0, position: 128, duration: 16, pitch: base + 16 },
  ]);
}
