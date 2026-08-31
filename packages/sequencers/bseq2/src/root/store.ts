import { createStore } from "snap-store";
import { defaultSequencerEditState, PatternRange } from "@/core/defs";

export const store = createStore<{
  octave: number;
  duty: number;
  patternRange: PatternRange;
  stepBits: number;
  playPos: number;
}>({
  ...defaultSequencerEditState,
  playPos: -1,
});
