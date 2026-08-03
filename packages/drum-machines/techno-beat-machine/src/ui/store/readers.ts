import { PartItem, PartKey } from "@/model/defs";
import { store } from "@/ui/store/store";

export const storeReaders = {
  getPartItem(partKey: PartKey): PartItem {
    return store.state.partItems.find((item) => item.partKey === partKey)!;
  },
  getCurrentPart(): PartItem {
    const partKey = store.state.currentPartKey;
    return store.state.partItems.find((item) => item.partKey === partKey)!;
  },
};

export function useCurrentPart(): PartItem {
  const { currentPartKey, partItems } = store.useSnapshot();
  return partItems.find((p) => p.partKey === currentPartKey)!;
}
