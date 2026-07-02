import { createStore } from "snap-store";
import {
  defaultEffectParameters,
  EffectParameters,
} from "@/common/definitions";

export const store = createStore<{
  parameters: EffectParameters;
}>({
  parameters: defaultEffectParameters,
});
