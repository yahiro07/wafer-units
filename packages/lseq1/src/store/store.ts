import { seqNumbers } from "mofur/ax";
import { createStore } from "snap-store";
import { LoopBars, SpecialStep, StepStride } from "@/types";

type StoreState = {
  bpm: number;
  stdPlaying: boolean;
  activeNotes: number[];
  loopBars: LoopBars;
  stepStride: StepStride;
  allSteps: number[];
  octaveShift: number;
  stepDuty: number;
  editing: boolean;
  editPos: number;
  playPos: number;
  exPlaying: boolean;
  previewNote: number;
};

export type PersistState = {
  loopBars: LoopBars;
  stepStride: StepStride;
  allSteps: number[];
  octaveShift: number;
  stepDuty: number;
};

export const store = createStore<StoreState>({
  bpm: 120,
  stdPlaying: false,
  activeNotes: [],
  loopBars: 1,
  stepStride: 2,
  allSteps: seqNumbers(256).map(() => SpecialStep.rest),
  octaveShift: 0,
  stepDuty: 0.5,
  editing: false,
  editPos: 0,
  playPos: 0,
  exPlaying: false,
  previewNote: -1,
});
