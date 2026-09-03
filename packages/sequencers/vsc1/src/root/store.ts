import {
  defaultSequencerEditState,
  Note,
  EditScaleMode,
  SequencerEditState,
  KeySpec,
} from "@/defs/definitions";
import { createStore } from "snap-store";

type StoreState = SequencerEditState & {
  editScaleMode: EditScaleMode;
  //
  playStepIndex: number;
  stateLoadRevision: number;
  previewNote: Note | null;
  previewOccludedNoteIds: number[];
  currentPageIndex: number;
  tonePreviewPitchIndex: number;
  latestPitchIndex: number;
  keySpec: KeySpec;
  stdPlaying: boolean;
  playHeadIndex: number;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  editScaleMode: "chromatic",
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  previewOccludedNoteIds: [],
  currentPageIndex: 0,
  tonePreviewPitchIndex: -1,
  latestPitchIndex: 12,
  keySpec: { root: -3, mode: "minor" },
  stdPlaying: false,
  playHeadIndex: 0,
});
