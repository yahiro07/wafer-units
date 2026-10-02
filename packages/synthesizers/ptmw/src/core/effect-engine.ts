import type { UnitInterface } from "wafer-host/unit-types";
import type {
  SynthParameters,
  EffectEngine,
  SynthParameterKey,
} from "./definitions";
import {
  fracPart,
  invPower2,
  mapUnaryTo,
  midiToFrequency,
  mixValue,
  power2,
  power3,
  tunableSigmoid,
} from "@lib/mu2609/utils/synth-math-utils";
import { resultOf, seqNumbers } from "@lib/mu2609/utils/helpers";

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

const randomSequence = seqNumbers(200).map(() => Math.random());
const phaseTweakers = {
  speed(phase, color) {
    const rate = 1 + power2(color) * 7;
    return fracPart(phase * rate);
  },
  accel(phase, color) {
    const rate = 1 + power2(color) * 8;
    return fracPart(power2(phase * rate));
  },
  sfm(phase, color) {
    const fmRatio = mapUnaryTo(color, 1, 4);
    const fmDepth = color * 2;
    const fmOscValue = Math.sin(2 * Math.PI * phase * fmRatio);
    return fracPart(phase + fmOscValue * fmDepth);
  },
  sdm(phase, color) {
    const speedRate = mapUnaryTo(color, 1, 100);
    const indexF = phase * speedRate;
    const i0 = Math.floor(indexF);
    const i1 = i0 + 1;
    const m = indexF - i0;
    const y1 = phase;
    const y2 = mixValue(
      i0 === 0 ? 0 : randomSequence[i0],
      randomSequence[i1],
      m,
    );
    const y3 = mixValue(y1, y2, color);
    return mixValue(y1, y3, color);
  },
} satisfies Record<string, (phase: number, color: number) => number>;

type CustomWaveParameters = {
  wave: number;
  shape: number;
  dense: number;
  mix: number;
};

type CustomWaveProvider = {
  getPeriodicWave(params: CustomWaveParameters): PeriodicWave;
};

function createCustomWaveProvider(ac: AudioContext): CustomWaveProvider {
  const paramStep = 80;

  let latestKey: string | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    generateWaveform(pr: CustomWaveParameters): PeriodicWave {
      const phaseTweakerFn =
        {
          [0]: phaseTweakers.speed,
          [1]: phaseTweakers.accel,
          [2]: phaseTweakers.sfm,
          [3]: phaseTweakers.sdm,
        }[pr.wave] ?? phaseTweakers.speed;

      const d = mapUnaryTo(pr.dense, -1, 1);
      const k = resultOf(() => {
        if (d > 0) {
          return invPower2(d) * -0.95;
        } else {
          return invPower2(-d) * 0.95;
        }
      });
      const denseGainFix = resultOf(() => {
        if (d > 0) {
          return mapUnaryTo(power2(d), 1, 0.6);
        } else {
          return mapUnaryTo(power3(-d), 1, 1.8);
        }
      });
      const denseFn = (y: number) => {
        return tunableSigmoid(y, k) * denseGainFix;
      };
      return makePeriodicWave(ac, (pp) => {
        const y1 = pp * 2 - 1;
        const pp2 = phaseTweakerFn(pp, pr.shape);
        let y2 = pp2 * 2 - 1;
        if (0) {
          const y = mixValue(y1, y2, pr.mix);
          return denseFn(y);
        } else {
          y2 = denseFn(y2);
          return mixValue(y1, y2, pr.mix);
        }
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

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const waveProvider = createCustomWaveProvider(ac);

  let osc: OscillatorNode | undefined;
  let latestWave: PeriodicWave | undefined;

  const internal = {
    affectParameters(keys: SynthParameterKey[]) {
      const waveParamsChanged = (
        ["wave", "shape", "dense", "mix"] as const
      ).some((key) => keys.includes(key));
      if (osc && waveParamsChanged) {
        const pr = parameters;
        const newWave = waveProvider.getPeriodicWave({
          wave: pr.wave,
          shape: pr.shape,
          dense: pr.dense,
          mix: pr.mix,
        });
        if (latestWave !== newWave) {
          osc.setPeriodicWave(newWave);
          latestWave = newWave;
        }
      }
    },
    affectParametersAll() {
      internal.affectParameters(["wave", "shape", "dense", "mix"]);
    },
  };
  internal.affectParametersAll();

  return {
    affectParameters: internal.affectParameters,
    affectParametersAll: internal.affectParametersAll,
    noteOn(noteNumber) {
      if (osc) {
        osc.stop();
      }
      const freq = midiToFrequency(noteNumber);
      osc = ac.createOscillator();
      const pr = parameters;
      const wave = waveProvider.getPeriodicWave({
        wave: pr.wave,
        shape: pr.shape,
        dense: pr.dense,
        mix: pr.mix,
      });
      osc.setPeriodicWave(wave);
      latestWave = wave;
      osc.frequency.value = freq;
      osc.connect(outputNode);
      osc.start();
    },
    noteOff(noteNumber) {
      osc?.stop();
    },
    cleanup() {
      // disconnectNodes(inputNode, pannerNode, gainNode, outputNode);
    },
  };
}
