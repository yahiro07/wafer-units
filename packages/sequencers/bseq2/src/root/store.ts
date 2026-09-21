import { createStore } from "snap-store";
import { defaultSequencerEditState, PatternRange } from "@/core/defs";

export const store = createStore<{
  octave: number;
  duty: number;
  patternRange: PatternRange;
  stepBits: number;
  playPos: number;
  viewActive: boolean;
}>({
  ...defaultSequencerEditState,
  playPos: -1,
  viewActive: false,
});
