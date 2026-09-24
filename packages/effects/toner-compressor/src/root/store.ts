import { createStore } from "snap-store";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";

export const store = createStore<{
  barLength: number;
  hostBpm: number;
  viewActive: boolean;
  parameters: EffectParameters;
  bypass: boolean;
  sideChain: boolean;
}>({
  barLength: 1,
  hostBpm: 0,
  viewActive: false,
  parameters: defaultEffectParameters,
  bypass: false,
  sideChain: false,
});

export const useStoreSnapshot = store.useSnapshot;
