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
  oscWave: number; //0~13
  oscOctave: number; //-2~2
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
  foldingShaperWave: number; //0~4
  foldingShaperLevel: number;
  densityShaperLevel: number;
  masterVolume: number;
};

export const integerParametersRanges = {
  oscWave: { min: 0, max: 13 },
  oscOctave: { min: -2, max: 2 },
  foldingShaperWave: { min: 0, max: 4 },
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
    hpfOn: true,
    hpfCutoff: 0,
    hpfPeak: 0,
    filterOn: true,
    filterCutoff: 1,
    filterPeak: 0,
    foldingShaperOn: true,
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
