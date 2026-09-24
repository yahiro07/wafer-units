import { createStore } from "snap-store";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";

export const store = createStore<{
  barLength: number;
  hostBpm: number;
  viewActive: boolean;
  parameters: EffectParameters;
}>({
  barLength: 1,
  hostBpm: 0,
  viewActive: false,
  parameters: defaultEffectParameters,
});

export const useStoreSnapshot = store.useSnapshot;
