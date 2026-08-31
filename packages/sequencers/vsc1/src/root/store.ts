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
  tonePreviewNoteNumber: number;
  latestPitchIndex: number;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  // previewStepNotes: null,
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
  tonePreviewNoteNumber: -1,
  latestPitchIndex: 12,
});
