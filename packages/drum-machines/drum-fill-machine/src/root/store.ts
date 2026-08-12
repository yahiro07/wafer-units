import {
  defaultSceneEditState,
  PartKey,
  SceneEditState,
} from "@/core/definitions";
import { createStore } from "snap-store";

export type StoreState = SceneEditState & {
  oneShotTriggered: boolean;
  partHitCounts: { [key in PartKey]?: number };
};

export const store = createStore<StoreState>({
  ...defaultSceneEditState,
  oneShotTriggered: false,
  partHitCounts: {},
});
