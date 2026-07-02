import { seqNumbers } from "mofur/ax";
import { createSelectorOptions } from "@/base/selector-option";
import { ClockDivision, PatternRange } from "@/base/types";

export const clockDivisionOptions = createSelectorOptions<ClockDivision>([
  [4, "div4"],
  [2, "div2"],
  [1, "1"],
]);

export const patternRangeOptions = createSelectorOptions<PatternRange>([
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [8, "8"],
  [16, "16"],
]);

export const gaugeReferenceIndexMap: Record<PatternRange, number[]> = {
  2: seqNumbers(8).flatMap(() => [0, 1]),
  3: seqNumbers(2).flatMap(() => [0, 1, 2, 0, 1, 2, 0, 1]),
  4: seqNumbers(4).flatMap(() => [0, 1, 2, 3]),
  8: seqNumbers(2).flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7]),
  16: seqNumbers(16),
};
