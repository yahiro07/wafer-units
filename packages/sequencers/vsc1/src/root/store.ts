import {
  defaultSequencerEditState,
  Note,
  PitchMode,
  SequencerEditState,
} from "@/defs/definitions";
import { createStore } from "snap-store";

type StoreState = SequencerEditState & {
  playStepIndex: number;
  stateLoadRevision: number;
  previewNote: Note | null;
  currentPageIndex: number;
  tonePreviewPitchIndex: number;
  latestPitchIndex: number;
  keyTranspose: number;
  pitchMode: PitchMode;
  keyLabel: string;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
  tonePreviewPitchIndex: -1,
  latestPitchIndex: 12,
  keyTranspose: 0,
  pitchMode: "chromatic",
  keyLabel: "C/Am",
});
