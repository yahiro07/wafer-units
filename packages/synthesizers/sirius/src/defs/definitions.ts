export enum OscWave {
  sawtooth = 0,
  sawtoothR,
  sawtoothR2,
  pulse125,
  pulse25,
  square,
  triangle,
}
export const oscWaveTypesForUi: OscWave[] = [
  OscWave.sawtooth,
  OscWave.sawtoothR,
  // OscWave.sawtoothR2,
  OscWave.pulse125,
  OscWave.pulse25,
  OscWave.square,
  OscWave.triangle,
];

export type SynthParameters = {
  patchOctave: number;
  oscWave: OscWave;
  oscDetune: number; // 0~1
  oscSub: number; // 0~1
  oscDrift: number; // 0~1
  filterCutoff: number; // 0~1
  filterPeak: number; // 0~1
  filterDecay: number; // 0~1
  ampDecay: number; // 0~1
  ampRelease: number; // 0~1
  fxChorus: number; // 0~1
  fxReverb: number; // 0~1
  patchVolume: number; // 0~1
};

export const defaultSynthParameters: SynthParameters = {
  patchOctave: 0,
  oscWave: OscWave.sawtooth,
  oscDetune: 0,
  oscSub: 0,
  oscDrift: 0,
  filterCutoff: 1,
  filterPeak: 0,
  filterDecay: 0,
  ampDecay: 1,
  ampRelease: 0,
  fxChorus: 0,
  fxReverb: 0,
  patchVolume: 0.5,
};

export type ISynthesizerEngine = {
  setParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time?: number, velocity?: number) => void;
  noteOff: (noteNumber: number, time?: number) => void;
  cleanup: () => void;
};
