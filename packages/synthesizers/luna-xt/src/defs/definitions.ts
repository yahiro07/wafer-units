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
  osc1Octave: number; //-2~2
  osc1Wave: OscWave; //1~12
  osc1Unison: number; //1~5
  osc1Spread: boolean;
  osc1Detune: number; //0~1
  osc1Decay: number; //0~1
  //
  osc2Octave: number;
  osc2Wave: OscWave;
  osc2Unison: number;
  osc2Spread: boolean;
  osc2Detune: number;
  osc2Decay: number;
  //
  oscMix: number;
  ampHead: number;
  ampRelease: number;
  ampExponential: boolean;
  ampReleaseLastOnly: boolean;
  //
  lpfCutoff: number;
  lpfPeak: number;
  lpfDecay: number;
  //
  patchVolume: number;
  //
  _saturation: number;
  press: number;
  density: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  osc1Octave: 0,
  osc1Wave: OscWave.sawtooth,
  osc1Unison: 1,
  osc1Spread: true,
  osc1Detune: 0,
  osc1Decay: 1,
  //
  osc2Octave: 0,
  osc2Wave: OscWave.sawtooth,
  osc2Unison: 1,
  osc2Spread: true,
  osc2Detune: 0,
  osc2Decay: 1,
  //
  oscMix: 0,
  ampHead: 0,
  ampRelease: 0,
  ampExponential: false,
  ampReleaseLastOnly: false,
  patchVolume: 0.5,
  //
  lpfCutoff: 0,
  lpfPeak: 0,
  lpfDecay: 0,
  //
  _saturation: 0,
  press: 0,
  density: 0,
};

export type LinearParameterKeys = PickKeysForValueType<SynthParameters, number>;
export type BoolParameterKeys = PickKeysForValueType<SynthParameters, boolean>;

export type SynthesizerEngine = {
  affectParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time?: number) => void;
  noteOff: (noteNumber: number, time?: number) => void;
  cleanup: () => void;
};

export type OscId = "osc1" | "osc2";
