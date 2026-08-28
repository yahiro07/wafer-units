import { PickKeysForValueType } from "@/utils/utility-types";

export enum OscWave {
  sawtooth = 0,
  exp1,
  shark,
  twoPulseSaw,
  syncSaw,
  fourPulseSaw,
  square,
  pulse40,
  pulse25,
  pulse125,
  //
  sawSig,
  pdSaw,
  trapezoid,
}
export const numOscWaveTypes = OscWave.sawSig;

export const oscWaveLabels: { [K in OscWave]?: string } = {
  [OscWave.sawtooth]: "S1",
  [OscWave.exp1]: "S2",
  [OscWave.shark]: "S3",
  [OscWave.twoPulseSaw]: "S4",
  [OscWave.syncSaw]: "S5",
  [OscWave.fourPulseSaw]: "S6",
  [OscWave.square]: "P1",
  [OscWave.pulse40]: "P2",
  [OscWave.pulse25]: "P3",
  [OscWave.pulse125]: "P4",
};

export enum FilterType {
  LP12 = 0,
  LP24,
  BP,
  HP,
  NOTCH,
}

export type SynthParameters = {
  lane1On: boolean;
  lane1Volume: number;
  lane2On: boolean;
  lane2Volume: number;
  lane3On: boolean;
  lane3Volume: number;
  //
  osc1Octave: number; //-2~2
  osc1Wave: OscWave; //1~12
  osc1Unison: number; //1~5
  osc1Spread: boolean;
  osc1Detune: number; //0~1
  osc1Sub: boolean;
  osc1Mix: number; //0~1
  //
  osc2Octave: number;
  osc2Wave: OscWave;
  osc2Unison: number;
  osc2Spread: boolean;
  osc2Detune: number;
  osc2Sub: boolean;
  osc2Mix: number;
  //
  osc3Octave: number;
  osc3Wave: OscWave;
  osc3Unison: number;
  osc3Spread: boolean;
  osc3Detune: number;
  osc3Sub: boolean;
  osc3Mix: number;
  //
  filter1Type: FilterType;
  filter1Cutoff: number;
  filter1Peak: number;
  filter1Env: number;
  //
  filter2Type: FilterType;
  filter2Cutoff: number;
  filter2Peak: number;
  filter2Env: number;
  //
  filter3Type: FilterType;
  filter3Cutoff: number;
  filter3Peak: number;
  filter3Env: number;
  //
  amp1DecayAltAttack: boolean;
  amp1Decay: number;
  amp1Release: number;
  //
  amp2DecayAltAttack: boolean;
  amp2Decay: number;
  amp2Release: number;
  //
  amp3DecayAltAttack: boolean;
  amp3Decay: number;
  amp3Release: number;
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
  lane1On: true,
  lane1Volume: 0.5,
  lane2On: false,
  lane2Volume: 0.5,
  lane3On: false,
  lane3Volume: 0.5,
  //
  osc1Octave: 0,
  osc1Wave: OscWave.sawtooth,
  osc1Unison: 1,
  osc1Spread: true,
  osc1Detune: 0,
  osc1Sub: false,
  osc1Mix: 0.5,
  //
  osc2Octave: 0,
  osc2Wave: OscWave.sawtooth,
  osc2Unison: 1,
  osc2Spread: true,
  osc2Detune: 0,
  osc2Sub: false,
  osc2Mix: 0.5,
  //
  osc3Octave: 0,
  osc3Wave: OscWave.sawtooth,
  osc3Unison: 1,
  osc3Spread: true,
  osc3Detune: 0,
  osc3Sub: false,
  osc3Mix: 0.5,
  //
  amp1DecayAltAttack: false,
  amp1Decay: 1,
  amp1Release: 0,
  //
  amp2DecayAltAttack: false,
  amp2Decay: 1,
  amp2Release: 0,
  //
  amp3DecayAltAttack: false,
  amp3Decay: 1,
  amp3Release: 0,
  //
  filter1Type: FilterType.LP12,
  filter1Cutoff: 1,
  filter1Peak: 0,
  filter1Env: 0,
  //
  filter2Type: FilterType.LP12,
  filter2Cutoff: 1,
  filter2Peak: 0,
  filter2Env: 0,
  //
  filter3Type: FilterType.LP12,
  filter3Cutoff: 1,
  filter3Peak: 0,
  filter3Env: 0,
  //
  reverbTime: 0.5,
  reverbTone: 0.5,
  reverbMix: 0,
  //
  density: 0,
  patchVolume: 0.5,
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

export type LaneId = "lane1" | "lane2" | "lane3";
