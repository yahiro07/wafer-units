import { createStore } from "snap-store";
import { defaultSequencerEditState } from "@/common/defs";

export const store = createStore<{
  octave: number;
  duty: number;
  stepBits: number[];
  playPos: number;
}>({
  octave: defaultSequencerEditState.octave,
  duty: defaultSequencerEditState.duty,
  stepBits: defaultSequencerEditState.stepBits,
  playPos: -1,
});
