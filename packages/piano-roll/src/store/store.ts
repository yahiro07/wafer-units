import { createStore } from "snap-store";
import { Note } from "@/store/types";

const defaultNotes: Note[] = 0
  ? [
      { id: 0, stepPosition: 0, stepDuration: 2, relativeNoteNumber: 14 },
      { id: 1, stepPosition: 2, stepDuration: 2, relativeNoteNumber: 15 },
      { id: 2, stepPosition: 4, stepDuration: 2, relativeNoteNumber: 16 },
      { id: 3, stepPosition: 6, stepDuration: 2, relativeNoteNumber: 17 },
      { id: 4, stepPosition: 8, stepDuration: 2, relativeNoteNumber: 17 },
      { id: 5, stepPosition: 16, stepDuration: 8, relativeNoteNumber: 17 },
      { id: 6, stepPosition: 32, stepDuration: 16, relativeNoteNumber: 14 },
    ]
  : [];

export const store = createStore<{
  notes: Note[];
  noteDuty: number;
  octaveShift: number;
  currentPageIndex: number;
  draftNote: Note | null;
  loopBars: number;
}>({
  notes: defaultNotes,
  noteDuty: 1,
  octaveShift: 0,
  currentPageIndex: 0,
  draftNote: null,
  loopBars: 1,
});
