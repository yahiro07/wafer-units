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
