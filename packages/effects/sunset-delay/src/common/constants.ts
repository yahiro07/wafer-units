import { createPlainSelectorOptions } from "@/common/selector-option";
import { DelayTime, EffectParameters } from "@/common/types";

export const delayTimeValues: DelayTime[] = [
  0.333, 0.5, 0.666, 0.75, 1, 1.5, 2, 2.5, 3,
];

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
  safety: true,
};
