import { createStore } from "snap-store";
import { StoreState } from "@/definitions/types";
import { defaultStoreState } from "@/definitions/initial-states";

export const store = createStore<StoreState>(defaultStoreState);
