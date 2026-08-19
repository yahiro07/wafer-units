import { seqNumbers } from "@/utils/helpers";
import { createPlainSelectorOptions } from "@/utils/selector-option";

export type PatternRange = 4 | 8 | 16;

export const PatterRangeOptions = createPlainSelectorOptions([4, 8, 16]);

export type SequencerEditState = {
  octave: number;
  duty: number;
  patternRange: PatternRange;
  stepBits: number; //2bit x 16
};

export const defaultSequencerEditState: SequencerEditState = {
  octave: -1,
  duty: 0.5,
  patternRange: 4,
  stepBits: 0,
};

export const stepReferenceIndexMap = {
  4: seqNumbers(4).flatMap(() => [0, 1, 2, 3]),
  8: seqNumbers(2).flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7]),
  16: seqNumbers(16),
};
