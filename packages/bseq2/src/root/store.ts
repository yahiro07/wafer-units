import { createStore } from "snap-store";
import { defaultSequencerState, PatternRange } from "@/common/defs";

export const store = createStore<{
  octave: number;
  duty: number;
  patternRange: PatternRange;
  stepBits: number;
  playPos: number;
}>({
  ...defaultSequencerState,
  playPos: -1,
});
