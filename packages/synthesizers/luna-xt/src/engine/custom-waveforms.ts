import { OscWave } from "@/defs/definitions";
import { tunableSigmoid } from "@/utils/synth-math-utils";

const periodicWaveCache: Partial<Record<OscWave, PeriodicWave | null>> = {};

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

function wrapCreatePeriodicWave(
  context: AudioContext,
  fn: (pp: number) => number,
) {
  const n = 256;
  const terms = 32;
  const ys = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const pp = i / n;
    const y = 2 * pp - 1;
    ys[i] = fn(y);
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

function getSaturatedSawWave(context: AudioContext, k: number) {
  return wrapCreatePeriodicWave(context, (y) => tunableSigmoid(y, k));
}

export function getCustomWaveform(
  context: AudioContext,
  wave: OscWave,
): OscillatorType | PeriodicWave {
  if (wave === OscWave.sawtooth) {
    return "sawtooth";
  } else if (wave === OscWave.sawtoothR) {
    return (periodicWaveCache[wave] ??= getSaturatedSawWave(context, -0.6));
  } else if (wave === OscWave.pulse125) {
    return (periodicWaveCache[wave] ??= getPulseWave(context, 0.125));
  } else if (wave === OscWave.pulse25) {
    return (periodicWaveCache[wave] ??= getPulseWave(context, 0.25));
  } else if (wave === OscWave.ex1) {
    return "square";
  }
  return "sine"; //fallback, not used
}
