import { PatternLength } from "@/root/definitions";
import { fillArray, seqNumbers } from "@/utils/helpers";
import { createStore } from "snap-store";

//stepNote: 0:none, 1:on, 2:tie

type StoreState = {
  octaveShift: number;
  stepDuty: number;
  chordEnabled: boolean;
  chordToneFlags: boolean[];
  gaterEnabled: boolean;
  patternLength: PatternLength;
  stepNotes: number[];
  previewStepNotes: number[] | null;
};

export const store = createStore<StoreState>({
  octaveShift: 0,
  stepDuty: 0.5,
  chordEnabled: true,
  chordToneFlags: seqNumbers(8).map((i) => i === 0),
  gaterEnabled: true,
  patternLength: 4,
  stepNotes: fillArray(32, 0),
  previewStepNotes: null,
});
if (1) {
  store.setStepNotes(
    seqNumbers(32).map((i) =>
      i === 3 || i === 7 ? 1 : i === 4 || i === 5 ? 2 : 0,
    ),
  );
}
