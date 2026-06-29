import { createSelectorOptions } from "@/common/selector-option";
import { RateDivision } from "@/common/types";

export const rateDivisionOptions = createSelectorOptions<RateDivision>([
  [4, "/4"],
  [8, "/8"],
  [16, "/16"],
  [32, "/32"],
  [64, "/64"],
]);
