import {
  clampValue,
  linearInterpolate,
  mapUnaryTo,
  resultOf,
} from "@lib/mu2609/utils/helpers";
import {
  invPower2,
  power2,
  power3,
  tunableSigmoid,
  mixValue,
} from "@lib/mu2609/utils/synth-math-utils";
import { phaseTweakers } from "./phase-tweakers";
import { CustomWaveParameters } from "./waveform-types";

type PtmBaseWaveKind = "saw" | "sine" | "rect";
type PtmKind = keyof typeof phaseTweakers;
type ColorScaleCurve = "linear" | "power2";
type WindowType =
  | "slope"
  | "hann"
  | "upperSlope"
  | "slopeD"
  | "wideHann"
  | "tailHann";

type WaveformSpec = {
  ptmKind: PtmKind;
  baseWaveKind?: PtmBaseWaveKind; //fallback to saw
  ptmLevelScaling?: number;
  ptmLevelCurve?: ColorScaleCurve;
  windowType?: WindowType;
  windowMix?: boolean;
};

const waveformSpecMap: Record<number, WaveformSpec> = {
  [0]: {
    ptmKind: "sfm",
    windowType: "slopeD",
    windowMix: true,
  },
  [1]: {
    ptmKind: "speed",
    ptmLevelScaling: 0.7,
    windowType: "slope",
    windowMix: true,
  },
  [2]: {
    ptmKind: "accel",
    ptmLevelScaling: 0.7,
    windowType: "slopeD",
    windowMix: true,
  },
  [3]: { ptmKind: "sdm" },
  [4]: { ptmKind: "screw" },
  [5]: { ptmKind: "drill", ptmLevelScaling: 0.8 },
  // [6]: { ptmKind: "creep2", windowType: "tailHann" },
  // [7]: { ptmKind: "ridge", windowType: "slopeD" },
  [6]: {
    ptmKind: "squash",
    ptmLevelScaling: 1,
    windowType: "wideHann",
    windowMix: true,
  },
};

export const numWaveformSpecs = Object.keys(waveformSpecMap).length;

export function createCoreWaveformGenerator(pr: CustomWaveParameters) {
  const {
    ptmKind,
    baseWaveKind = "saw",
    ptmLevelScaling = 1,
    ptmLevelCurve,
    windowType,
    windowMix,
  } = waveformSpecMap[pr.wave as keyof typeof waveformSpecMap] ??
  waveformSpecMap[0];

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
      return mapUnaryTo(power2(d), 1, 0.9);
    } else {
      return mapUnaryTo(power3(-d), 1, 1.8);
    }
  });
  const denseFn = (y: number) => {
    return tunableSigmoid(y, k) * denseGainFix;
  };
  const baseWaveFn = {
    saw: (pp: number) => pp * 2 - 1,
    sine: (pp: number) => -Math.cos(pp * Math.PI * 2),
    rect: (pp: number) => (pp < 0.5 ? 1 : -1),
  }[baseWaveKind];
  return {
    getSample(pp: number): number {
      const y1 = baseWaveFn(pp);
      let color =
        (ptmLevelCurve === "power2" ? power2(pr.shape) : pr.shape) *
        ptmLevelScaling;
      const pp2 = phaseTweakers[ptmKind](pp, color);
      let y2 = baseWaveFn(pp2);
      let win = 1;
      if (windowType === "slope") {
        win = 1 - pp;
      } else if (windowType == "slopeD") {
        win = 1 - pp * 0.4;
      } else if (windowType === "upperSlope") {
        if (y2 > 0) win = 1 - pp;
      } else if (windowType === "hann") {
        win = (0.5 + (0.5 - Math.cos(pp * Math.PI * 2))) * 0.5;
      } else if (windowType === "wideHann") {
        const pp2 = resultOf(() => {
          if (pp < 0.3) return linearInterpolate(pp, 0, 0.3, 0, 0.5);
          if (pp > 0.7) return linearInterpolate(pp, 0.7, 1, 0.5, 1);
          return 0.5;
        });
        win = (0.5 + (0.5 - Math.cos(pp2 * Math.PI * 2))) * 0.5;
      } else if (windowType === "tailHann") {
        const pp2 = pp < 0.9 ? 0.5 : linearInterpolate(pp, 0.9, 1, 0.5, 1);
        win = (0.5 + (0.5 - Math.cos(pp2 * Math.PI * 2))) * 0.5;
      }
      if (windowMix) {
        win = mixValue(1, win, power2(color));
      }
      y2 *= win;
      if (1) {
        const y = mixValue(y1, y2, pr.mix);
        const z = denseFn(y);
        return clampValue(z, -1, 1);
      } else {
        y2 = denseFn(y2);
        const z = mixValue(y1, y2, pr.mix);
        return clampValue(z, -1, 1);
      }
    },
  };
}
