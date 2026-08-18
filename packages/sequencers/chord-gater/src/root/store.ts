import {
  defaultSequencerEditState,
  SequencerEditState,
} from "@/root/definitions";
import { seqNumbers } from "@/utils/helpers";
import { createStore } from "snap-store";

//stepNote: 0:none, 1:on, 2:tie

type StoreState = SequencerEditState & {
  previewStepNotes: number[] | null;
  playStepIndex: number;
};

export const store = createStore<StoreState>({
  ...defaultSequencerEditState,
  previewStepNotes: null,
  playStepIndex: -1,
});
if (0) {
  //debug dummy notes
  store.setStepNotes(
    seqNumbers(32).map((i) =>
      i === 2 || i === 3 || i === 7 ? 1 : i === 4 || i === 5 ? 2 : 0,
    ),
  );
}
