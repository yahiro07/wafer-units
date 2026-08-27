import { PickKeysForValueType } from "@/utils/utility-types";

export enum OscWave {
  sawtooth = 0,
  square = 1,
}
export const numOscWaveTypes = Object.values(OscWave).length;

export type SynthParameters = {
  oscWave: OscWave;
  filterCutoff: number;
  filterPeak: number;
  filterEnvMod: number;
  ampDecay: number;
  //
  patchVolume: number;
  _saturation: number;
  density: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  oscWave: OscWave.sawtooth,
  filterCutoff: 1,
  filterPeak: 0,
  filterEnvMod: 0,
  ampDecay: 0.5,
  //
  patchVolume: 0.5,
  _saturation: 1,
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
