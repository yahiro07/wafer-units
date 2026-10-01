import { createStore } from "snap-store";
import { defaultEffectParameters, EffectParameters } from "@/core/definitions";

export const store = createStore<{
  //persisted
  parameters: EffectParameters;
  effectEnabled: boolean;
  sideChain: boolean;
  //volatile
  barLength: number;
  hostBpm: number;
  viewActive: boolean;
}>({
  parameters: defaultEffectParameters,
  effectEnabled: true,
  sideChain: false,
  barLength: 1,
  hostBpm: 0,
  viewActive: false,
});

export const useStoreSnapshot = store.useSnapshot;
