import { createStore } from "snap-store";
import { Note } from "@/store/types";

const defaultNotes: Note[] = 1
  ? [
      { stepPosition: 0, stepDuration: 2, relativeNoteNumber: 14 },
      { stepPosition: 2, stepDuration: 2, relativeNoteNumber: 15 },
      { stepPosition: 4, stepDuration: 2, relativeNoteNumber: 16 },
      { stepPosition: 6, stepDuration: 2, relativeNoteNumber: 17 },
      { stepPosition: 16, stepDuration: 8, relativeNoteNumber: 17 },
      { stepPosition: 32, stepDuration: 16, relativeNoteNumber: 14 },
    ]
  : [];

export const store = createStore<{
  notes: Note[];
  noteDuty: number;
  octaveShift: number;
  currentPageIndex: number;
}>({
  notes: defaultNotes,
  noteDuty: 1,
  octaveShift: 0,
  currentPageIndex: 0,
});
