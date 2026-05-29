export enum OscWave {
  sawToRect = 0,
  rectPw,
  pdSaw,
  sawSpeed,
  sawAccel,
  sawSfm,
  sawDrill,
  sawSdm,
  sawCreep,
  sawCreep2,
  sawSquash,
  sawSinus,
  sawRidge,
  sawScrew,
  count,
}
export type SynthParameters = {
  oscWave: number;
  oscOctave: number;
  oscShape: number;
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  chorusLevel: number;
  reverbLevel: number;
  hpfOn: boolean;
  hpfCutoff: number;
  hpfPeak: number;
  filterOn: boolean;
  filterCutoff: number;
  filterPeak: number;
  foldingShaperOn: boolean;
  foldingShaperWave: number;
  foldingShaperLevel: number;
  densityShaperLevel: number;
  masterVolume: number;
};

export function createSynthParameters(): SynthParameters {
  return {
    oscWave: 3,
    oscOctave: 0,
    oscShape: 0,
    ampAttack: 0,
    ampDecay: 0,
    ampSustain: 1,
    ampRelease: 0,
    chorusLevel: 0,
    reverbLevel: 0,
    hpfOn: false,
    hpfCutoff: 0,
    hpfPeak: 0,
    filterOn: false,
    filterCutoff: 1,
    filterPeak: 0,
    foldingShaperOn: false,
    foldingShaperWave: 0,
    foldingShaperLevel: 0,
    densityShaperLevel: 0,
    masterVolume: 0.8,
  };
}
export type NumberParameterKeys = {
  [K in keyof SynthParameters]: SynthParameters[K] extends number ? K : never;
}[keyof SynthParameters];
export type BooleanParameterKeys = {
  [K in keyof SynthParameters]: SynthParameters[K] extends boolean ? K : never;
}[keyof SynthParameters];
