import { OscWave } from "@/defs/definitions";
import { topLimit } from "@/utils/helpers";
import { fracPart, invPower2, tunableSigmoid } from "@/utils/synth-math-utils";

function getPulseWave(context: AudioContext, duty: number) {
  const terms = 32;
  const real = new Float32Array(terms);
  const imag = new Float32Array(terms);
  const g = 1.7;
  real[0] = duty * g;
  for (let i = 1; i < terms; i++) {
    const n = i;
    real[i] = (2 / (n * Math.PI)) * Math.sin(Math.PI * n * duty) * g;
    imag[i] = 0;
  }
  return context.createPeriodicWave(real, imag, {
    disableNormalization: true,
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

const builders = {
  saturatedSaw(ctx: AudioContext, k: number) {
    return makePeriodicWave(ctx, (pp) => {
      const y = 2 * pp - 1;
      return tunableSigmoid(y, k) * 0.8;
    });
  },
  pdSaw(ctx: AudioContext, level: number) {
    return makePeriodicWave(ctx, (pp) => {
      return Math.sin(2 * Math.PI * Math.pow(pp, 1 - level)) * 1.6;
    });
  },
  expoSaw(ctx: AudioContext, k: number) {
    return makePeriodicWave(ctx, (pp) => {
      if (0) {
        const y = 2 * pp - 1;
        return Math.exp(y);
      } else {
        const y = 2 * pp - 1;
        return tunableSigmoid(y, 0.7);
      }
    });
  },
  syncSaw(ctx: AudioContext, speed: number) {
    return makePeriodicWave(ctx, (pp) => {
      if (0) {
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
      return (y * 2 - 1) * 2;
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
  } else if (wave === OscWave.sawSig) {
    return builders.saturatedSaw(ctx, -0.5);
  } else if (wave === OscWave.pulse125) {
    return getPulseWave(ctx, 0.125);
  } else if (wave === OscWave.pulse25) {
    return getPulseWave(ctx, 0.25);
  } else if (wave === OscWave.pulse40) {
    return getPulseWave(ctx, 0.4);
  } else if (wave === OscWave.pdSaw) {
    return builders.pdSaw(ctx, 0.92);
  } else if (wave === OscWave.exp1) {
    return builders.expoSaw(ctx, 0.3);
  } else if (wave === OscWave.syncSaw) {
    return builders.syncSaw(ctx, 1.7);
  } else if (wave === OscWave.shark) {
    return builders.pulseSaw(ctx, 0.3);
  } else if (wave === OscWave.twoPulseSaw) {
    return builders.twoPulseSaw(ctx);
  } else if (wave === OscWave.fourPulseSaw) {
    return builders.fourPulseSaw(ctx);
  } else if (wave === OscWave.trapezoid) {
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
