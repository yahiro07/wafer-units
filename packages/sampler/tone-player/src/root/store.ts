import { createStore } from "snap-store";
import { defaultEffectParameters, SamplerParameters } from "@/core/definitions";

export const store = createStore<{
  parameters: SamplerParameters;
}>({
  parameters: defaultEffectParameters,
});
