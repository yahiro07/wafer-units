import { appEnvs } from "@/defs/app-envs";

export enum WaveMode {
  PD,
  FM,
  PTM2,
  PTM3,
  PTM4,
  PTM5,
  PTM6,
  PTM7,
  FM2,
  PD2,
  PD3,
  PD4,
  PD5,
  PD6,
  PD7,
  PD8,
  PD9,
  PD10,
  PD11,
  PD12,
  PD13,
  PD14,
}
export const numWaveModes = 22;

export enum ShapeEnvRange {
  Low = 0,
  High = 1, //default
}

export type SynthParameters = {
  waveMode: WaveMode;
  shape: number;
  envRange: ShapeEnvRange;
  envDecay: number;
  detune: number;
  sub: boolean;
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

export type SynthLinearParameters = Omit<SynthParameters, "sub">;

export const defaultSynthParameters: SynthParameters = {
  waveMode: WaveMode.PD,
  shape: 0,
  envRange: ShapeEnvRange.High,
  envDecay: 0,
  detune: 0,
  sub: false,
  decay: 1,
  release: 0,
  drift: 0,
  loFi: 0,
  chorus: 0,
  delay: 0,
  reverb: 0,
  master: 0.5,
};

if (appEnvs.isDevelopment && 0) {
  Object.assign(defaultSynthParameters, {
    decay: 0.5,
    release: 0.5,
  });
}
