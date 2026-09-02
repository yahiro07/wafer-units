import { PickKeysForValueType } from "@/utils/utility-types";

export const oscShapeStep = 10;

export enum FilterType {
  LP12 = 0,
  LP24,
}

export type SynthParameters = {
  //
  osc1Octave: number; //-2~2
  osc1Unison: number; //0~3
  osc1Shape: number;
  osc1Spread: boolean;
  osc1Detune: number; //0~1
  osc1Sub: boolean;
  osc1Mix: number; //0~1
  //
  filter1Type: FilterType;
  filter1Cutoff: number;
  filter1Peak: number;
  filter1Env: number;
  filter1EnvRelease: boolean;
  //
  amp1Full: boolean;
  amp1Attack: number;
  amp1Decay: number;
  amp1Sustain: number;
  amp1Release: number;
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
  //
  osc1Octave: 0,
  osc1Unison: 3,
  osc1Shape: 0.5,
  osc1Spread: true,
  osc1Detune: 0.5,
  osc1Sub: false,
  osc1Mix: 0.5,
  //
  amp1Full: false,
  amp1Attack: 0,
  amp1Decay: 1,
  amp1Sustain: 1,
  amp1Release: 0,
  //
  filter1Type: FilterType.LP12,
  filter1Cutoff: 1,
  filter1Peak: 0,
  filter1Env: 0,
  filter1EnvRelease: false,
  //
  reverbTime: 0.5,
  reverbTone: 0.5,
  reverbMix: 0,
  //
  density: 0,
  patchVolume: 0.5,
};
if (0) {
  Object.assign(defaultSynthParameters, {
    osc1Unison: 0,
    amp1Full: true,
  });
}

export const fixedParameters = {
  ampHead: 0,
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

export type LaneId = "lane1";
