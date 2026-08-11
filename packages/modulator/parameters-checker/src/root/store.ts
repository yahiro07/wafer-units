import { ParameterItem } from "@/defs/types";
import { seqNumbers } from "@/utils/helpers";
import { createStore } from "snap-store";

type StoreState = {
  connected: boolean;
  parameterItems: ParameterItem[];
  latestEditPayload: { id: string; value: number } | null;
};

export const store = createStore<StoreState>({
  connected: false,
  parameterItems: [],
  latestEditPayload: null,
});

if (import.meta.env.DEV) {
  store.setParameterItems(
    seqNumbers(16).map((i) => ({ id: `param-${i}`, value: Math.random() })),
  );
}
