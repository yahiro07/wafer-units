import {
  defaultSequencerEditState,
  Note,
  SequencerEditState,
} from "@/root/definitions";
import { createStore } from "snap-store";

//stepNote: 0:none, 1:on, 2:tie

type StoreState = SequencerEditState & {
  previewStepNotes: number[] | null;
  playStepIndex: number;
  stateLoadRevision: number;
  previewNote: Note | null;
  currentPageIndex: number;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  previewStepNotes: null,
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
});
if (1) {
  store.setPatternLength(8);
  store.setNotes([
    { id: 0, position: 0, duration: 2, pitch: 7 },
    { id: 1, position: 2, duration: 2, pitch: 9 },
    { id: 2, position: 4, duration: 2, pitch: 11 },
    { id: 3, position: 6, duration: 2, pitch: 13 },
    { id: 4, position: 8, duration: 2, pitch: 14 },
  ]);
}
