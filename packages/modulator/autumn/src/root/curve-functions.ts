import { Waveform, EffectParameters } from "@/core/definitions";
import {
  linearInterpolate,
  mapUnaryTo,
  clampValue,
  seqNumbers,
} from "@lib/mu2609/utils/helpers";
import { tunableSigmoid, fracPart } from "@lib/mu2609/utils/synth-math-utils";

type CoreCurveFn = (param1: number, param2: number) => (pp: number) => number;

function gummaCurve(x: number, k: number) {
  return x ** (1 + k * 8);
}

const coreCurveFns: Record<Waveform, CoreCurveFn> = {
  ramp(xOffset, curve1) {
    const pivot = xOffset * 0.99;
    return (pp) => {
      if (pp < pivot) return 0;
      const y = linearInterpolate(pp, pivot, 1, 0, 1);
      return gummaCurve(y, curve1);
    };
  },
  ramp2(param1, param2) {
    const k1 = mapUnaryTo(param1, -0.9, 0.9);
    const k2 = -param2 * 0.98;
    return (pp) => {
      const pp1 = tunableSigmoid(pp, k1);
      let y = pp1 * 2 - 1;
      return tunableSigmoid(y, k2) * 0.5 + 0.5;
    };
  },
  tri(param1, param2) {
    const pivot = mapUnaryTo(param1, 0.005, 0.995);
    return (pp) => {
      if (pp < pivot) {
        return linearInterpolate(pp, 0, pivot, 0, 1);
      } else {
        return linearInterpolate(pp, pivot, 1, 1, 0);
      }
    };
  },
  sine(param1, param2) {
    const pivot = mapUnaryTo(param1, 0.005, 0.995);
    const k = -param2 * 0.95;
    return (pp) => {
      let y = 0;
      if (pp < pivot) {
        const p1 = pp / pivot;
        y = -Math.cos(Math.PI * p1);
      } else {
        const p1 = 1 - (pp - pivot) / (1 - pivot);
        y = -Math.cos(Math.PI * p1);
      }
      return tunableSigmoid(y, k) * 0.5 + 0.5;
    };
  },
  rect(param1, param2) {
    const p0 = clampValue(param1 - param2 * 0.3, 0, 1);
    const p1 = clampValue(param1 + param2 * 0.3, 0, 1);
    return (pp) => {
      if (pp < p0) {
        return 0;
      } else if (pp < p1) {
        return linearInterpolate(pp, p0, p1, 0, 1, true);
      } else {
        return 1;
      }
    };
  },
  sh(param1, param2) {
    const root = Math.random();
    const bits = Math.round(mapUnaryTo(param2, 2, 5));
    const length = 2 ** bits;
    return (pp) => {
      if (pp < param1) return 0;
      const index = Math.floor(pp * length);
      return fracPart(randomSequence[index] + root);
    };
  },
};
const randomSequence = seqNumbers(100).map(() => Math.random());

export function makeWrapperCurveFn(parameters: EffectParameters) {
  const curveFn = coreCurveFns[parameters.waveform](
    parameters.xOffset,
    parameters.curve,
  );
  return (pp: number) => {
    const y = curveFn(pp);
    const z = linearInterpolate(y, 0, 1, parameters.v1, parameters.v2);
    return z;
  };
}
