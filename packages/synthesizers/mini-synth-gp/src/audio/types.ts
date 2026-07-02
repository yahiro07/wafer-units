export type SynthParameters = {
  oscWave: number;
  oscDetune: number;
  oscSub: number;
  oscDrift: number;
  fxChorus: number;
  fxReverb: number;
  filterCutoff: number;
  filterPeak: number;
  filterEnvMod: number;
  ampDecay: number;
  ampRelease: number;
  ampMaster: number;
};

export type ProgramPreset = {
  name: string;
  parameters: SynthParameters;
};

export type SynthParameterKey = keyof SynthParameters;
