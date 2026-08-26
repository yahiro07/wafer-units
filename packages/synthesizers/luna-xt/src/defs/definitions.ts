import { PickKeysForValueType } from "@/utils/utility-types";

export enum OscWave {
  sawtooth = 0,
  sawtoothR,
  pulse125,
  pulse25,
  pulse40,
  ex1,
  ex2,
  ex3,
  ex4,
  ex5,
  ex6,
  ex7,
  ex8,
  __num,
}
export const numOscWaveTypes = OscWave.__num;

export type SynthParameters = {
  osc1Wave: OscWave;
  osc1Decay: number;
  ampHead: number;
  ampRelease: number;
  ampExponential: boolean;
  ampReleaseLastOnly: boolean;
  patchVolume: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  osc1Wave: OscWave.sawtooth,
  osc1Decay: 0,
  ampHead: 0,
  ampRelease: 0,
  ampExponential: false,
  ampReleaseLastOnly: false,
  patchVolume: 0.5,
};

export type LinearParameterKeys = PickKeysForValueType<SynthParameters, number>;
export type BoolParameterKeys = PickKeysForValueType<SynthParameters, boolean>;

export type SynthesizerEngine = {
  affectParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time?: number) => void;
  noteOff: (noteNumber: number, time?: number) => void;
  cleanup: () => void;
};
