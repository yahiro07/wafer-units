import { createStore } from "snap-store";
import { allPartKeys, PartItem, PartKey } from "@/model/defs";
import { createDefaultPartItem } from "@/model/generator/initializer";

type StoreState = {
  localPlaying: boolean;
  currentPartKey: PartKey;
  soloMode: boolean;
  partItems: PartItem[];
  masterVolume: number;
  partHitCounts: { [key in PartKey]?: number };
};

export const store = createStore<StoreState>({
  localPlaying: false,
  currentPartKey: "BD",
  soloMode: false,
  partItems: allPartKeys.map(createDefaultPartItem),
  masterVolume: 0.5,
  partHitCounts: {},
});
