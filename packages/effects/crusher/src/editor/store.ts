import { createStore } from "snap-store";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";

export const store = createStore<{
  parameters: EffectParameters;
}>({
  parameters: defaultEffectParameters,
});
