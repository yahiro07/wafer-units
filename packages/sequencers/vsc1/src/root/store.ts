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
  currentPageIndex: number;
  tonePreviewPitchIndex: number;
  latestPitchIndex: number;
  keySpec: KeySpec;
  stdPlaying: boolean;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  editScaleMode: "chromatic",
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
  tonePreviewPitchIndex: -1,
  latestPitchIndex: 12,
  keySpec: { root: -3, mode: "minor" },
  stdPlaying: false,
});
