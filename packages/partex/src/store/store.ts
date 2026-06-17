import { createStore } from "snap-store";
import { Note, PatternMode } from "@/store/types";

const defaultNotes: Note[] = 1
  ? [
      { id: 0, stepPosition: 0, stepDuration: 2, relativeNoteNumber: 7 },
      { id: 1, stepPosition: 2, stepDuration: 2, relativeNoteNumber: 8 },
      { id: 2, stepPosition: 4, stepDuration: 2, relativeNoteNumber: 9 },
      { id: 3, stepPosition: 6, stepDuration: 2, relativeNoteNumber: 10 },
      { id: 4, stepPosition: 8, stepDuration: 8, relativeNoteNumber: 11 },
      { id: 5, stepPosition: 16, stepDuration: 16, relativeNoteNumber: 5 },
      { id: 6, stepPosition: 32, stepDuration: 16, relativeNoteNumber: 14 },
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
  patternMode: "simple",
  mappedNotes: [],
  ghostEnabled: true,
});
