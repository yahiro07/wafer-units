import { createPlainSelectorOptions } from "@/common/selector-option";
import { DelayTime, EffectParameters } from "@/common/types";

// export const delayTimeOptions = createSelectorOptions<DelayTime>([
//   [0.333, "1/12"],
//   [0.5, "1/8"],
//   [0.666, "1/6"],
//   [0.75, "3/16"],
//   [1, "1/4"],
//   [1.5, "3/8"],
//   [2, "1/2"],
//   [3, "3/4"],
// ]);

export const delayTimeOptions = createPlainSelectorOptions<DelayTime>([
  0.333, 0.5, 0.666, 0.75, 1, 1.5, 2, 2.5, 3,
]);

export const defaultParameters: EffectParameters = {
  isOn: true,
  time: 1,
  tone: 0.5,
  feed: 0.5,
  mix: 0.5,
  lfoOn: true,
  lfoRate: 0.5,
  lfoDepth: 0.5,
};
