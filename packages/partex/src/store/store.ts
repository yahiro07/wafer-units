import { createStore } from "snap-store";
import { Note, PatternMode } from "@/store/types";

const defaultNotes: Note[] = 1
  ? [
      { id: 0, position: 0, duration: 2, pitch: 7 },
      { id: 1, position: 2, duration: 2, pitch: 8 },
      { id: 2, position: 4, duration: 2, pitch: 9 },
      { id: 3, position: 6, duration: 2, pitch: 10 },
      { id: 4, position: 8, duration: 8, pitch: 11 },
      { id: 5, position: 16, duration: 16, pitch: 5 },
      { id: 6, position: 32, duration: 16, pitch: 14 },
    ]
  : [];

export const store = createStore<{
  inputNotes: Note[];
  noteDuty: number;
  octaveShift: number;
  currentPageIndex: number;
  draftNote: Note | null;
  loopBars: number;
  patternBars: number;
  patternMode: PatternMode;
  mappedNotes: Note[];
  ghostEnabled: boolean;
}>({
  inputNotes: defaultNotes,
  noteDuty: 1,
  octaveShift: 0,
  currentPageIndex: 0,
  draftNote: null,
  loopBars: 2,
  patternBars: 1,
  patternMode: "shift",
  mappedNotes: [],
  ghostEnabled: true,
});
