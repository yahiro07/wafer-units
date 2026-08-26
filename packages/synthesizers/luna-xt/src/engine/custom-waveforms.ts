import { OscWave } from "@/defs/definitions";
import { topLimit } from "@/utils/helpers";
import { fracPart, invPower2, tunableSigmoid } from "@/utils/synth-math-utils";

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

function getSawWaveEx(context: AudioContext, k: number) {
  const terms = 32;
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  real[0] = 0;
  for (let i = 1; i < terms; i++) {
    const n = i;
    real[i] = 0;
    imag[i] = -2 / (n ** k * Math.PI);
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
  expoSaw(ctx: AudioContext, k: number) {
    return makePeriodicWave(ctx, (pp) => {
      return 2 * pp ** k - 1;
    });
  },
  syncSaw(ctx: AudioContext, speed: number) {
    return makePeriodicWave(ctx, (pp) => {
      if (1) {
        const pp2 = fracPart(pp * speed);
        return 2 * pp2 - 1;
      } else {
        const pivot = 1 / speed;
        let pp2;
        if (pp < pivot) {
          pp2 = pp / pivot;
        } else {
          pp2 = (pp - pivot) / (1 - pivot);
        }
        return 2 * pp2 - 1;
      }
    });
  },
  pulseSaw(ctx: AudioContext, k: number) {
    return makePeriodicWave(ctx, (pp) => {
      const y = pp < k ? invPower2(pp / k) : 0;
      return y * 2 - 1;
    });
  },
  twoPulseSaw(ctx: AudioContext) {
    return makePeriodicWave(ctx, (pp) => {
      const pp2 = fracPart(pp * 3);
      const y = pp < 2 / 3 ? pp2 : 0;
      return y * 2 - 1;
    });
  },
  fourPulseSaw(ctx: AudioContext) {
    return makePeriodicWave(ctx, (pp) => {
      if (1) {
        const pp2 = fracPart(pp * 5);
        const y = (pp < 4 / 5 ? pp2 : 0) * topLimit((pp * 5) / 4, 1);
        return y * 2 - 1;
      } else {
        const pp2 = fracPart(pp * 4);
        const y = pp < 3 / 4 ? pp2 : 0;
        return y * 2 - 1;
      }
    });
  },
  trapezoid(ctx: AudioContext) {
    const p0 = 0.25;
    const p1 = 0.5;
    return makePeriodicWave(ctx, (pp) => {
      let y = 0;
      if (pp < p0) {
        y = pp / p0;
      } else if (pp < p1) {
        y = 1;
      }
      return y * 2 - 1;
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
  } else if (wave === OscWave.pulse40) {
    return getPulseWave(ctx, 0.4);
  } else if (wave === OscWave.ex1) {
    return builders.pdSaw(ctx, 0.98);
  } else if (wave === OscWave.ex2) {
    return getSawWaveEx(ctx, 0.8);
  } else if (wave === OscWave.ex3) {
    return builders.expoSaw(ctx, 0.3);
  } else if (wave === OscWave.ex4) {
    return builders.syncSaw(ctx, 1.5);
  } else if (wave === OscWave.ex5) {
    return builders.pulseSaw(ctx, 0.3);
  } else if (wave === OscWave.ex6) {
    return builders.twoPulseSaw(ctx);
  } else if (wave === OscWave.ex7) {
    return builders.fourPulseSaw(ctx);
  } else if (wave === OscWave.ex8) {
    return builders.trapezoid(ctx);
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
