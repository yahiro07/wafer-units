export enum OscWave {
  Saw = 0,
  Rect,
  Tri,
  Sine,
  Ex, //S7 for OSC1, noise for OSC2
}
export const numOscWaveTypes = 5;

export type SynthParameters = {
  voiceOctave: number;
  osc1Wave: OscWave;
  oscDetune: number;
  osc2Wave: OscWave;
  osc2Octave: number;
  osc2Volume: number;
  hpfCutoff: number;
  hpfQ: number;
  lpfCutoff: number;
  lpfEnvMod: number;
  lpfQ: number;
  lpfSteep: boolean;
  attackAltPunch: boolean;
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  density: number;
  globalVolume: number;
  pitchLfoAltPitchEg: boolean;
  pitchLfoRate: number;
  pitchLfoDepth: number;
  filterLfoRate: number;
  filterLfoDepth: number;
  reverbDecay: number;
  reverbMix: number;
  reverbDamp: number;
  chorusLevel: number;
  presence: number;
};

export type SynthPresetParameters = SynthParameters;

export const defaultSynthParameters: SynthParameters = {
  voiceOctave: 0,
  osc1Wave: OscWave.Saw,
  oscDetune: 0,
  osc2Wave: OscWave.Saw,
  osc2Octave: 0,
  osc2Volume: 0,
  hpfCutoff: 0,
  hpfQ: 0,
  lpfCutoff: 1,
  lpfEnvMod: 0,
  lpfQ: 0,
  lpfSteep: false,
  attackAltPunch: false,
  ampAttack: 0,
  ampDecay: 0,
  ampSustain: 1,
  ampRelease: 0,
  density: 0,
  globalVolume: 0.5,
  pitchLfoAltPitchEg: false,
  pitchLfoRate: 0.5,
  pitchLfoDepth: 0,
  filterLfoRate: 0.5,
  filterLfoDepth: 0,
  reverbDecay: 0.5,
  reverbMix: 0,
  reverbDamp: 0.5,
  chorusLevel: 0,
  presence: 0,
};

export type LinearParameterKeys = Exclude<
  keyof SynthParameters,
  "attackAltPunch" | "pitchLfoAltPitchEg" | "lpfSteep"
>;

export type ISynthesizer = {
  affectParameters: (parameters: Partial<SynthParameters>) => void;
  noteOn: (noteNumber: number, time?: number) => void;
  noteOff: (noteNumber: number, time?: number) => void;
  cleanup: () => void;
};
