import { appEnvs } from "@/common/app-envs";
import {
  defaultSequencerEditState,
  Note,
  PitchMode,
  SequencerEditState,
} from "@/defs/definitions";
import { createStore } from "snap-store";
import { SongKeySpec } from "wafer-host/unit-types";

type StoreState = SequencerEditState & {
  playStepIndex: number;
  stateLoadRevision: number;
  previewNote: Note | null;
  currentPageIndex: number;
  tonePreviewPitchIndex: number;
  latestPitchIndex: number;
  keyMode: SongKeySpec["mode"];
  keyTranspose: number;
  pitchMode: PitchMode;
  keyLabel: string;
  stdPlaying: boolean;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  playStepIndex: -1,
  stateLoadRevision: 0,
  previewNote: null,
  currentPageIndex: 0,
  tonePreviewPitchIndex: -1,
  latestPitchIndex: 12,
  keyMode: "major",
  keyTranspose: 0,
  pitchMode: "chromatic",
  keyLabel: "C/Am",
  stdPlaying: false,
});

if (appEnvs.isDevelopment && 0) {
  store.assign({
    keyMode: "minor",
    keyLabel: "G/Em",
    keyTranspose: 7,
    pitchMode: "diatonic",
  });
}
