import { PickKeysForValueType } from "@/utils/utility-types";

export enum OscWave {
  Saw = 0,
  Rect,
}
export const numOscWaveTypes = 2;

export type SynthParameters = {
  osc1Wave: OscWave;
  osc1Decay: number;
  ampHead: number;
  ampRelease: number;
  legato: boolean;
  patchVolume: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  osc1Wave: OscWave.Saw,
  osc1Decay: 0,
  ampHead: 0,
  ampRelease: 0,
  legato: false,
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
