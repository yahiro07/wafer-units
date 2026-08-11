import { ParameterItem } from "@/defs/types";
import { createStore } from "snap-store";

type StoreState = {
  parameterItems: ParameterItem[];
};

export const store = createStore<StoreState>({
  parameterItems: [],
});
