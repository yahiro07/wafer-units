import { fillNumbers, seqNumbers } from "@/utils/helpers";
import { createStore } from "snap-store";

//stepNote: 0:none, 1:on, 2:tie

export const store = createStore<{
  stepNotes: number[];
  previewStepNotes: number[] | null;
}>({
  stepNotes: fillNumbers(32, 0),
  previewStepNotes: null,
});
if (1) {
  store.setStepNotes(
    seqNumbers(32).map((i) =>
      i === 3 || i === 7 ? 1 : i === 4 || i === 5 ? 2 : 0,
    ),
  );
}
