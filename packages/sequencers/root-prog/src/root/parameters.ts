export type KeyLabelMode = "doremi" | "degreeMajor" | "degreeMinor";
export type LoopBars = 1 | 2 | 4;

export type SequencerParameters = {
  loopBars: LoopBars;
};

export const defaultSequencerParameters: SequencerParameters = {
  loopBars: 4,
};
