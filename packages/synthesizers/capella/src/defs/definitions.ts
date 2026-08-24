import { PickKeysForValueType } from "@/utils/utility-types";

export type OscWaveType = "sine" | "triangle" | "square" | "sawtooth";

export const allOscWaveTypes: OscWaveType[] = [
  "sine",
  "triangle",
  "square",
  "sawtooth",
];

export const allOsc1Ratios = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 11, 13,
];

export type SynthParameters = {
  osc1Wave: OscWaveType;
  osc1Octave: number;
  osc1Ratio: number;
  osc1Decay: number;
  osc2Wave: OscWaveType;
  osc2ModAltMix: boolean;
  osc2Mod: number;
  osc2Decay: number;
  ampRelease: number;
  chorusLevel: number;
  chorusAltReverb: boolean;
  patchOctave: number;
  patchVolume: number;
};

export type LinearParameterKeys = PickKeysForValueType<SynthParameters, number>;
export type BoolParameterKeys = PickKeysForValueType<SynthParameters, boolean>;

export const defaultSynthParameters: SynthParameters = {
  osc1Wave: "sine",
  osc1Octave: 0,
  osc1Ratio: 1,
  osc1Decay: 1,
  osc2Wave: "sine",
  osc2ModAltMix: false,
  osc2Mod: 0,
  osc2Decay: 1,
  ampRelease: 0,
  chorusLevel: 0,
  chorusAltReverb: false,
  patchOctave: 0,
  patchVolume: 0.5,
};

export type ISynthesizer = {
  applyParameters(parameters: Partial<SynthParameters>): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  cleanup(): void;
};
