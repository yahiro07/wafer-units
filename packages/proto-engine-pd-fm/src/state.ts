import { WaveMode } from "./constants";

export interface SynthParameters {
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
}

export const defaultParams: SynthParameters = {
  // waveMode: WaveMode.PD,
  waveMode: WaveMode.FM,
  shape: 0,
  envMod: 0,
  detune: 0,
  sub: 0,
  decay: 1,
  release: 0,
  drift: 0,
  loFi: 0,
  chorus: 0,
  delay: 0,
  reverb: 0,
  master: 0.7,
};

if (0) {
  Object.assign(defaultParams, {
    waveMode: WaveMode.FM,
    shape: 0.5,
    envMod: 0.3,
    detune: 0.1,
    sub: 0.3,
    decay: 0.4,
    release: 0.3,
    drift: 0.1,
    chorus: 0.2,
    reverb: 0.2,
  });
}

if (1) {
  Object.assign(defaultParams, {
    waveMode: WaveMode.PD,
    shape: 0.7,
    envMod: 0.5,
    detune: 0.1,
    sub: 0.3,
    decay: 0.4,
    release: 0.3,
    drift: 0.1,
    chorus: 0.2,
    reverb: 0.2,
  });
}
