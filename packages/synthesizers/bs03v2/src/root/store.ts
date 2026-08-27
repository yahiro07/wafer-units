import {
  defaultSequencerEditState,
  defaultSynthesizerEditState,
  SequencerEditState,
  SynthesizerEditState,
} from "@/defs/definitions";
import { createStore } from "snap-store";

type StoreState = SequencerEditState &
  SynthesizerEditState & {
    standalonePlaying: boolean;
    hostPlaying: boolean;
    bpm: number;
    playPosition: number;
    pitchPresetIndex: number;
    lockPitchPreset: boolean;
  };

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  ...defaultSynthesizerEditState,
  standalonePlaying: false,
  hostPlaying: false,
  bpm: 120,
  playPosition: -1,
  pitchPresetIndex: 0,
  lockPitchPreset: false,
});
