import { seqNumbers, fillArray } from "@/utils/helpers";

export type PatternLength = 4 | 8 | 16 | 32;

export type SequencerEditState = {
  octaveShift: number;
  stepDuty: number;
  chordEnabled: boolean;
  chordToneFlags: boolean[];
  gaterEnabled: boolean;
  patternLength: PatternLength;
  stepNotes: number[];
};

export const defaultSequencerEditState: SequencerEditState = {
  octaveShift: 0,
  stepDuty: 0.5,
  chordEnabled: true,
  chordToneFlags: seqNumbers(9).map((i) => i === 0),
  gaterEnabled: true,
  patternLength: 4,
  stepNotes: fillArray(32, 0),
};
