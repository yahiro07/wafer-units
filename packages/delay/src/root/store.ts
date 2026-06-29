import { createStore } from "snap-store";
import { EffectParameters } from "@/common/types";

export const store = createStore<{
  parameters: EffectParameters;
}>({
  parameters: {
    isOn: true,
    rate: 16,
    feed: 0.5,
    mix: 0.5,
  },
});
