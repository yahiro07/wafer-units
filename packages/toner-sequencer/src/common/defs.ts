import { seqNumbers } from "mofur/ax";

export type SequencerState = {
  octave: number;
  duty: number;
  stepBits: number[];
};

export const defaultSequencerState: SequencerState = {
  octave: 0,
  duty: 0.5,
  stepBits: seqNumbers(10).map(() => 0),
};
