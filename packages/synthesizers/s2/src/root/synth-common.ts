export type SynthParameters = {
  octave: number; //-2,-1,0,1,2
  osc1Wave: number; //0,1,2,3 for saw, square, tri, sine
  osc1Octave: number; //-1,0,1
  osc1Coarse: number; //-12~12
  osc1Fine: number; //-1~1
  osc2Wave: number;
  osc2Octave: number;
  osc2Coarse: number;
  osc2Fine: number;
  osc2PhaseRandom: boolean;
  oscCrossDetune: number; //0~1
  oscMix: number;
  filterCutoff: number;
  filterPeak: number;
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  outputVolume: number;
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  osc1Wave: 0,
  osc1Octave: 0,
  osc1Coarse: 0,
  osc1Fine: 0,
  osc2Wave: 0,
  osc2Octave: 0,
  osc2Coarse: 0,
  osc2Fine: 0,
  osc2PhaseRandom: true,
  oscCrossDetune: 0,
  oscMix: 0.5,
  filterCutoff: 1,
  filterPeak: 0,
  ampAttack: 0,
  ampDecay: 0.5,
  ampSustain: 0.5,
  ampRelease: 0.1,
  outputVolume: 0.8,
};
