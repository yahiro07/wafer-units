import { createStore } from "snap-store";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";

export const store = createStore<{
  viewActive: boolean;
  parameters: EffectParameters;
}>({
  viewActive: false,
  parameters: defaultEffectParameters,
});

export const useStoreSnapshot = store.useSnapshot;
