export enum WaveMode {
  PD = 0,
  FM = 1,
  PTM2 = 2,
  PTM3 = 3,
  PTM4,
  PTM5,
  PTM6,
  PTM7,
  PTM8,
  PTM9,
  PTM10,
}
export const numWaveModes = 10;

export type SynthParameters = {
  waveMode: WaveMode;
  shape: number;
  envDecay: number;
  detune: number;
  sub: number;
  decay: number;
  release: number;
  drift: number;
  loFi: number;
  chorus: number;
  delay: number;
  reverb: number;
  master: number;
};

export type SynthPresetParameters = Omit<SynthParameters, "master">;

export const defaultSynthParameters: SynthParameters = {
  waveMode: WaveMode.PD,
  shape: 0,
  envDecay: 0,
  detune: 0,
  sub: 0,
  decay: 0.5,
  release: 0,
  drift: 0,
  loFi: 0,
  chorus: 0,
  delay: 0,
  reverb: 0,
  master: 0.5,
};
