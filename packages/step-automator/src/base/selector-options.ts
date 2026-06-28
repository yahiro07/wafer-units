import { createSelectorOptions } from "@/base/selector-option";
import { ClockDivision, PatternRange } from "@/base/types";

export const clockDivisionOptions = createSelectorOptions<ClockDivision>([
  [1, "1"],
  [2, "2"],
  [4, "4"],
]);

export const patternRangeOptions = createSelectorOptions<PatternRange>([
  [2, "2"],
  [3, "3"],
  [4, "4"],
  [8, "8"],
  [16, "16"],
]);
