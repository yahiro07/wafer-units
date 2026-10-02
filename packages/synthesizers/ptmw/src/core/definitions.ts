export type OscParameters = {
  enabled: boolean;
  octave: number;
  wave: number;
  shape: number;
  dense: number;
  mix: number;
  unison: number;
  detune: number;
  pan: number;
  volume: number;
};
export type OscParameterKey = keyof OscParameters;

export type SynthParameters = {
  osc1: OscParameters;
  osc2: OscParameters;
  osc3: OscParameters;
};
export type SynthParameterKey = keyof SynthParameters;

export type OscId = "osc1" | "osc2" | "osc3";

export const defaultSynthParameters: SynthParameters = {
  osc1: {
    enabled: true,
    octave: 0,
    wave: 0,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
  },
  osc2: {
    enabled: false,
    octave: 0,
    wave: 1,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
  },
  osc3: {
    enabled: false,
    octave: 0,
    wave: 0,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
  },
};

export type EffectEngine = {
  affectParameters(keys: SynthParameterKey[]): void;
  affectParametersAll(): void;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  cleanup(): void;
};
