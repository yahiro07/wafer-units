export enum OscWave {
  Saw = 0,
  Rect,
  Tri,
  Sine,
  Noise,
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
  ampAttack: number;
  ampDecay: number;
  ampSustain: number;
  ampRelease: number;
  voiceVolume: number;
};

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
  ampAttack: 0,
  ampDecay: 0,
  ampSustain: 1,
  ampRelease: 0,
  voiceVolume: 0.5,
};

export type ISynthesizer = {
  setParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time?: number) => void;
  noteOff: (noteNumber: number, time?: number) => void;
  cleanup: () => void;
};
