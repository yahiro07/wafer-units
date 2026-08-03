import { seqNumbers } from "@/utils/helpers";

export type SequencerEditState = {
  octave: number;
  duty: number;
  stepBits: number[];
};

export const defaultSequencerEditState: SequencerEditState = {
  octave: 0,
  duty: 0.5,
  stepBits: seqNumbers(10).map(() => 0),
};
