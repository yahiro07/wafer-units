import { createStore } from "snap-store";
import { SynthPatternNote } from "@/types";

const defaultNotes: SynthPatternNote[] = 1
  ? [
      { relativeNoteNumber: 0, stepPosition: 0, stepDuration: 2 },
      { relativeNoteNumber: 1, stepPosition: 2, stepDuration: 2 },
      { relativeNoteNumber: 2, stepPosition: 4, stepDuration: 2 },
      { relativeNoteNumber: 3, stepPosition: 6, stepDuration: 2 },
    ]
  : [];

export const store = createStore<{
  notes: SynthPatternNote[];
  noteDuty: number;
  octaveShift: number;
}>({
  notes: defaultNotes,
  noteDuty: 1,
  octaveShift: 0,
});
