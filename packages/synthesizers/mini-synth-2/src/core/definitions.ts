export type SynthParameters = {
  oscWave: number; // 0, 1, 2 (saw, rect, pulse)
  oscDetune: number; // 0~1
  oscSub: number; // 0~1
  oscDrift: number; // 0~1
  filterCutoff: number; // 0~1
  filterPeak: number; // 0~1
  filterEnvMod: number; // 0~1
  ampDecay: number; // 0~1
  ampRelease: number; // 0~1
  saturation: number; // 0~1
  fxChorus: number; // 0~1
  fxReverb: number; // 0~1
  masterVolume: number; // 0~1
};

export const defaultSynthParameters: SynthParameters = {
  oscWave: 0,
  oscDetune: 0,
  oscSub: 0,
  oscDrift: 0,
  filterCutoff: 1,
  filterPeak: 0,
  filterEnvMod: 0,
  ampDecay: 1,
  ampRelease: 0,
  saturation: 0,
  fxChorus: 0,
  fxReverb: 0,
  masterVolume: 0.5,
};

export type ISynthesizerEngine = {
  setParameters: (parameters: SynthParameters) => void;
  noteOn: (noteNumber: number, time: number, velocity: number) => void;
  noteOff: (noteNumber: number, time: number) => void;
  cleanup: () => void;
};
