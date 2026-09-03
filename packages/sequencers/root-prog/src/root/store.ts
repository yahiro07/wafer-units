import { createStore } from "snap-store";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { seqNumbers } from "@/utils/helpers";

type StoreState = {
  keyLabelMode: KeyLabelMode;
  loopBars: LoopBars;
  notes: number[];
  keysName: string;
  playStepIndex: number;
};

export const store = createStore<StoreState>({
  keyLabelMode: "degreeMinor",
  loopBars: 4,
  notes: seqNumbers(16).map(() => -1),
  keysName: "C/Am",
  playStepIndex: -1,
});
