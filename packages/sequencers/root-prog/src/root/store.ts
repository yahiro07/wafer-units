import { createStore } from "snap-store";
import { KeyLabelMode, LoopBars } from "@/root/parameters";

type StoreState = {
  keyLabelMode: KeyLabelMode;
  loopBars: LoopBars;
};

export const store = createStore<StoreState>({
  keyLabelMode: "doremi",
  loopBars: 4,
});
