import { createCoreWaveformGenerator } from "./core-waveform-generator";
import { CustomWaveParameters } from "./waveform-types";

type CustomWaveformProvider = {
  getPeriodicWave(params: CustomWaveParameters): PeriodicWave;
};

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

export function createCustomWaveformProvider(
  ac: AudioContext,
): CustomWaveformProvider {
  const paramStep = 80;

  let latestKey: string | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    generateWaveform(pr: CustomWaveParameters): PeriodicWave {
      const coreWaveformGenerator = createCoreWaveformGenerator(pr);
      return makePeriodicWave(ac, (pp) => {
        return coreWaveformGenerator.getSample(pp);
      });
    },
  };

  return {
    getPeriodicWave(pr) {
      const shapeIndex = Math.round(pr.shape * paramStep);
      const denseIndex = Math.round(pr.dense * paramStep);
      const mixIndex = Math.round(pr.mix * paramStep);

      const wave = pr.wave;
      const key = `${wave}-${shapeIndex}-${denseIndex}-${mixIndex}`;
      if (key !== latestKey) {
        const shape = shapeIndex / paramStep;
        const dense = denseIndex / paramStep;
        const mix = mixIndex / paramStep;
        console.log(`generating waveform for ${key}`);
        latestWave = internal.generateWaveform({ wave, shape, dense, mix });
        latestKey = key;
      }
      return latestWave!;
    },
  };
}
