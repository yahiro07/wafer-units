import {
  defaultSequencerEditState,
  Note,
  SequencerEditState,
} from "@/defs/definitions";
import { createStore } from "snap-store";

type StoreState = SequencerEditState & {
  // previewStepNotes: number[] | null;
  playStepIndex: number;
  stateLoadRevision: number;
  previewNote: Note | null;
  currentPageIndex: number;
  previewNoteNumber: number;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  // previewStepNotes: null,
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
  previewNoteNumber: -1,
});
if (0) {
  store.setPatternLength(8);
  store.setNotes([
    { id: 0, position: 0, duration: 2, pitch: 7 },
    { id: 1, position: 2, duration: 2, pitch: 9 },
    { id: 2, position: 4, duration: 2, pitch: 11 },
    { id: 3, position: 6, duration: 2, pitch: 13 },
    { id: 4, position: 8, duration: 2, pitch: 14 },
  ]);
}
