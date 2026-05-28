import { seqNumbers } from "beams/ax/array-utils";
import { createSequencerTickDriver } from "beams/mx-audio/sequencer-tick-driver";
import { createStore } from "snap-store";
import { createSequencerEngine } from "@/sequencer/sequencer-engine";
import { createTargetSynthesizer } from "@/sequencer/target-synthesizer";
import { LoopBars, SpecialStep, StepStride } from "@/types";

export const targetSynth = createTargetSynthesizer();
export const sequencerEngine = createSequencerEngine(targetSynth);
export const standaloneTickDriver = createSequencerTickDriver();

type StoreState = {
  bpm: number;
  playing: boolean;
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
};

export const store = createStore<StoreState>({
  bpm: 120,
  playing: false,
  activeNotes: [],
  loopBars: 4,
  stepStride: 2,
  allSteps: seqNumbers(256).map(() => SpecialStep.rest),
  octaveShift: 0,
  stepDuty: 0.5,
  editing: false,
  editPos: 0,
  playPos: 0,
  exPlaying: false,
});
sequencerEngine.setAttributes({
  bpm: store.state.bpm,
  loopBars: store.state.loopBars,
  allSteps: store.state.allSteps,
  octaveShift: store.state.octaveShift,
  stepDuty: store.state.stepDuty,
});
standaloneTickDriver.setBpm(store.state.bpm);
