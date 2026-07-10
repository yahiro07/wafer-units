export type SynthParameters = {
  octave: number; //-2,-1,0,1,2
  osc1Wave: number; //0,1,2,3 for saw, square, tri, sine
  osc1Coarse: number; //-24~24
  osc1Fine: number; //-1~1
  osc2Wave: number;
  osc2Coarse: number;
  osc2Fine: number;
  ampDecay: number;
  outputVolume: number;
};

export const defaultSynthParameters: SynthParameters = {
  octave: 0,
  osc1Wave: 0,
  osc1Coarse: 0,
  osc1Fine: 0,
  osc2Wave: 0,
  osc2Coarse: 0,
  osc2Fine: 0,
  ampDecay: 0.5,
  outputVolume: 0.5,
};
