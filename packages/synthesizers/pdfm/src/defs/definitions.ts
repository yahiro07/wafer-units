export enum WaveMode {
  PD = 0,
  FM = 1,
  PTM2 = 2,
  PTM3 = 3,
  PTM4 = 4,
  PTM5 = 5,
  PTM6 = 6,
  PTM7 = 7,
  PTM8 = 8,
  PTM9 = 9,
  PTM10 = 10,
  PTM11 = 11,
  NumWaveModes = 12,
}

export type SynthParameters = {
  waveMode: WaveMode;
  shape: number;
  envMod: number;
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

export const defaultSynthParameters: SynthParameters = {
  waveMode: WaveMode.PD,
  shape: 0,
  envMod: 0,
  detune: 0,
  sub: 0,
  decay: 0.5,
  release: 0,
  drift: 0,
  loFi: 0,
  chorus: 0,
  delay: 0,
  reverb: 0,
  master: 0.7,
};
