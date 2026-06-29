import { createStore } from "snap-store";
import { defaultSequencerState } from "@/common/defs";

export const store = createStore<{
  octave: number;
  duty: number;
  stepBits: number[];
  playPos: number;
}>({
  octave: defaultSequencerState.octave,
  duty: defaultSequencerState.duty,
  stepBits: defaultSequencerState.stepBits,
  playPos: -1,
});
