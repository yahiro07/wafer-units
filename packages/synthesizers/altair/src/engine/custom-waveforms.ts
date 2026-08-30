import { oscShapeStep } from "@/defs/definitions";
import { linearInterpolate } from "@/utils/helpers";
import { mapUnaryTo, tunableSigmoid } from "@/utils/synth-math-utils";

function makePeriodicWave(context: AudioContext, fn: (pp: number) => number) {
  const n = 256;
  const terms = 128;
  const ys = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const pp = i / n;
    ys[i] = fn(pp);
  }
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  const g = 2;
  for (let h = 0; h < terms; h++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const phi = (2 * Math.PI * h * i) / n;
      re += ys[i] * Math.cos(phi);
      im += ys[i] * Math.sin(phi);
    }
    real[h] = (re / n) * g;
    imag[h] = (im / n) * g;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: true,
  });
}

function generateWaveform(
  ctx: AudioContext,
  params: WaveformParams,
): PeriodicWave {
  return makePeriodicWave(ctx, (pp) => {
    const y = 2 * pp - 1;
    const k = mapUnaryTo(params.shape, -0.8, 0.8);
    const g = linearInterpolate(params.shape, 0.5, 1, 1, 1.4, true);
    return tunableSigmoid(y, k) * g;
  });
}

type WaveformParams = {
  shape: number;
};

function createWaveformKey(params: WaveformParams) {
  const s1 = Math.round(params.shape * oscShapeStep);
  return {
    key: `${s1}`,
    steppedParams: {
      shape: s1 / oscShapeStep,
    },
  };
}

const waveformCache: Record<string, PeriodicWave> = {};

export function getCustomWaveform(
  ctx: AudioContext,
  params: WaveformParams,
): PeriodicWave {
  const { key, steppedParams } = createWaveformKey(params);
  if (!waveformCache[key]) {
    // console.log(`generating waveform for ${key}`);
    waveformCache[key] = generateWaveform(ctx, steppedParams);
  }
  return waveformCache[key];
}
