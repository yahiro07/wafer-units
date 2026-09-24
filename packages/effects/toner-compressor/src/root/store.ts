import { createStore } from "snap-store";
import {
  ChannelId,
  defaultEffectParameters,
  EffectParameters,
} from "@/core/definitions";

export const store = createStore<{
  barLength: number;
  hostBpm: number;
  activeChannelId: ChannelId;
  altMetersLayout: boolean;
  viewActive: boolean;
  parameters: EffectParameters;
}>({
  barLength: 1,
  hostBpm: 0,
  activeChannelId: "ch1",
  altMetersLayout: false,
  viewActive: false,
  parameters: defaultEffectParameters,
});

export const useStoreSnapshot = store.useSnapshot;
