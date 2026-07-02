import { createStore } from "snap-store";
import { defaultParameters } from "@/common/constants";
import { EffectParameters } from "@/common/types";

export const store = createStore<{
  parameters: EffectParameters;
}>({
  parameters: defaultParameters,
});
