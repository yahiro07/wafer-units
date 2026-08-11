import { createStore } from "snap-store";
import { allPartKeys, PartItem, PartKey } from "@/model/defs";
import { createDefaultPartItem } from "@/model/generator/initializer";
import { seqNumbers } from "@/utils/helpers";

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

if (1) {
  //default 4/4 kicks for initial setup
  store.producePartItems((draft) => {
    const item = draft.find((item) => item.partKey === "BD")!;
    const notes = seqNumbers(16).map((i) =>
      i % 4 === 0 ? { pitch: 0, velocity: 1 } : null,
    );
    item.notes = notes;
  });
}
