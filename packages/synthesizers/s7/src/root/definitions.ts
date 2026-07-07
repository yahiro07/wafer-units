export type SynthParameters = {
  octave: number;
  filterCutoff: number;
  filterPeak: number;
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  volume: number;
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  filterCutoff: 1,
  filterPeak: 0,
  ampAttack: 0,
  ampDecay: 0,
  ampSustain: 1,
  ampRelease: 0,
  volume: 0.5,
};
