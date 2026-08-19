export type PatternLength = 4 | 8 | 16 | 32;

export type Note = {
  id: number;
  pitch: number;
  position: number;
  duration: number;
};

export type SequencerEditState = {
  octaveShift: number;
  stepDuty: number;
  shiftEnabled: boolean;
  patternLength: PatternLength;
  notes: Note[];
};

export const defaultSequencerEditState: SequencerEditState = {
  octaveShift: 0,
  stepDuty: 0.5,
  shiftEnabled: true,
  patternLength: 4,
  notes: [],
};
