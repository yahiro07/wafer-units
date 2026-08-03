import { createStore } from "snap-store";
import { LoopKey } from "@/root/definitions";

export const store = createStore<{
  selectedLoopKey: LoopKey | null;
  previewLoopKey: LoopKey | null;
  hostPlaying: boolean;
}>({
  selectedLoopKey: null,
  previewLoopKey: null,
  hostPlaying: false,
});
