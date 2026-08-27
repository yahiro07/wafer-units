import { fillNumbers, seqNumbers } from "@/utils/helpers";
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

export type SynthesizerEditState = {
  synthParameters: SynthParameters;
};

export const defaultSynthesizerEditState: SynthesizerEditState = {
  synthParameters: defaultSynthParameters,
};

export type SequencerEditState = {
  pitchIndices: number[];
  stepNotes: number[];
  stepModifierFlags: number[];
  alterPatternsEnabled: boolean;
  twiddleKnobsEnabled: boolean;
};

export const defaultSequencerEditState: SequencerEditState = {
  pitchIndices: [0, 12, 24],
  stepNotes: fillNumbers(16, 0),
  stepModifierFlags: fillNumbers(16, 0),
  alterPatternsEnabled: false,
  twiddleKnobsEnabled: false,
};
if (1) {
  Object.assign(defaultSequencerEditState, {
    stepNotes: seqNumbers(16).map((i) => (i % 4) * 12),
    stepModifierFlags: seqNumbers(16).map((i) => i % 3),
  });
}

export const pitchPresets = [
  [0, 12, 24],
  [0, 7, 12, 19, 24],
];
