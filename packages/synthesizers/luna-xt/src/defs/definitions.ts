import { PickKeysForValueType } from "@/utils/utility-types";

export enum OscWave {
  sawtooth = 0,
  exp1,
  pdSaw,
  sawSig,
  syncSaw,
  fourPulseSaw,
  pulse125,
  pulse25,
  pulse40,
  trapezoid,
  //
  shark,
  twoPulseSaw,
}
export const numOscWaveTypes = OscWave.trapezoid + 1;

export type SynthParameters = {
  osc1Octave: number; //-2~2
  osc1Wave: OscWave; //1~12
  osc1Unison: number; //1~5
  osc1Spread: boolean;
  osc1Detune: number; //0~1
  osc1Sub: boolean;
  osc1Mix: number; //0/1/2
  //
  osc2Octave: number;
  osc2Wave: OscWave;
  osc2Unison: number;
  osc2Spread: boolean;
  osc2Detune: number;
  osc2Sub: boolean;
  osc2Mix: number;
  //
  oscMix: number;
  ampDecayAltAttack: boolean;
  ampDecay: number;
  ampRelease: number;
  //
  lpfCutoff: number;
  lpfPeak: number;
  lpfDecay: number;
  //
  reverbTime: number;
  reverbTone: number;
  reverbMix: number;
  //
  density: number;
  patchVolume: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  osc1Octave: 0,
  osc1Wave: OscWave.sawtooth,
  osc1Unison: 1,
  osc1Spread: true,
  osc1Detune: 0,
  osc1Sub: false,
  osc1Mix: 1,
  //
  osc2Octave: 0,
  osc2Wave: OscWave.sawtooth,
  osc2Unison: 1,
  osc2Spread: true,
  osc2Detune: 0,
  osc2Sub: false,
  osc2Mix: 1,
  //
  oscMix: 0,
  ampDecayAltAttack: false,
  ampDecay: 1,
  ampRelease: 0,
  patchVolume: 0.5,
  //
  lpfCutoff: 1,
  lpfPeak: 0,
  lpfDecay: 0,
  //
  reverbTime: 0.5,
  reverbTone: 0.5,
  reverbMix: 0,
  //
  density: 0,
};

export const fixedParameters = {
  ampHead: 0,
  ampExponential: true,
  ampReleaseLastOnly: false,
  lpfSteep: false,
  saturation: 1,
  press: 0,
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
