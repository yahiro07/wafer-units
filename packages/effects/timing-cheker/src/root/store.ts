import { createStore } from "snap-store";
import { LoopKey } from "@/root/definitions";

export const store = createStore<{
  selectedLoopKey: LoopKey | null;
}>({
  selectedLoopKey: null,
});
