import { OscWave } from "@/defs/definitions";
import { tunableSigmoid } from "@/utils/synth-math-utils";

function getPulseWave(context: AudioContext, duty: number) {
  const terms = 32;
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  real[0] = duty;
  for (let i = 1; i < terms; i++) {
    const n = i;
    real[i] = (2 / (n * Math.PI)) * Math.sin(Math.PI * n * duty);
    imag[i] = 0;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: false,
  });
}

function makePeriodicWave(context: AudioContext, fn: (pp: number) => number) {
  const n = 256;
  const terms = 32;
  const ys = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const pp = i / n;
    ys[i] = fn(pp);
  }
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  for (let h = 0; h < terms; h++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const phi = (2 * Math.PI * h * i) / n;
      re += ys[i] * Math.cos(phi);
      im += ys[i] * Math.sin(phi);
    }
    real[h] = re / n;
    imag[h] = im / n;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: false,
  });
}

const builders = {
  saturatedSaw(ctx: AudioContext, k: number) {
    return makePeriodicWave(ctx, (pp) => {
      const y = 2 * pp - 1;
      return tunableSigmoid(y, k);
    });
  },
  pdSaw(ctx: AudioContext, level: number) {
    return makePeriodicWave(ctx, (pp) => {
      return Math.sin(2 * Math.PI * Math.pow(pp, 1 - level));
    });
  },
};

function getCustomWaveformCore(
  ctx: AudioContext,
  wave: OscWave,
): OscillatorType | PeriodicWave {
  if (wave === OscWave.sawtooth) {
    return "sawtooth";
  } else if (wave === OscWave.sawtoothR) {
    return builders.saturatedSaw(ctx, -0.6);
  } else if (wave === OscWave.pulse125) {
    return getPulseWave(ctx, 0.125);
  } else if (wave === OscWave.pulse25) {
    return getPulseWave(ctx, 0.25);
  } else if (wave === OscWave.ex1) {
    return builders.pdSaw(ctx, 0.98);
  }
  return "sine"; //fallback, not used
}

const waveformsCache: Partial<
  Record<OscWave, PeriodicWave | OscillatorType | null>
> = {};
export function getCustomWaveform(
  ctx: AudioContext,
  wave: OscWave,
): OscillatorType | PeriodicWave {
  return (waveformsCache[wave] ??= getCustomWaveformCore(ctx, wave));
}
