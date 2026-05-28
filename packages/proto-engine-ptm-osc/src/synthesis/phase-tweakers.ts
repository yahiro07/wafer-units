import { seqNumbers } from "beams/ax/array-utils";
import {
  clampValue,
  linearInterpolate,
  mapUnaryTo,
  mixValue,
} from "beams/ax/number-utils";
import {
  fracPart,
  invPower2,
  power2,
} from "beams/mo-synthesis/synth-math-utils";

type PhaseTweakFn = (phase: number, prColor: number) => [number, number];

const TwoPi = Math.PI * 2;
const HalfPi = Math.PI / 2;
const Pi = Math.PI;

export const phaseTweakers = {
  sfm(phase, prColor) {
    const fmRatio = mapUnaryTo(prColor, 1, 4);
    const fmDepth = prColor * 2;
    const fmOscValue = Math.sin(phase * TwoPi * fmRatio);
    const modPhase = fracPart(phase + fmOscValue * fmDepth);
    const maxSlope = 1 + TwoPi * fmDepth * fmRatio;
    return [modPhase, maxSlope];
  },
  speed(phase, prColor) {
    const speedRate = 1 + prColor * 7;
    const modPhase = (phase * speedRate) % 1;
    return [modPhase, speedRate];
  },
  accel(phase, prColor) {
    const speedRate = 1 + power2(phase) * prColor * 15;
    const modPhase = (phase * speedRate) % 1;
    return [modPhase, speedRate];
  },
  drill(_x, _a) {
    const a = mapUnaryTo(_a, 0.25, 1);
    const x = _x;
    const speedRate = 1 + power2(a) * 15;
    const x1Raw = x * speedRate;
    const x1 = x1Raw % 1;
    let y1 = x1 < 0.5 ? 0 : 1;
    if (x1Raw < 2) y1 = 1;
    const modPhase = x * y1;
    return [modPhase, 1];
  },
  pw(phase, a) {
    const b = mapUnaryTo(a, 0.5, 0.05);
    const modPhase =
      phase < b ? (phase / b) * 0.5 : 0.5 + ((phase - b) / (1 - b)) * 0.5;
    return [modPhase, 1];
  },
  "sub-pw"(phase, prColor) {
    const bp = mapUnaryTo(prColor, 0.5, 0.05);
    let modPhase = 0;
    if (phase < bp) {
      modPhase = phase / bp;
    } else {
      modPhase = linearInterpolate(phase, bp, 1, 0, 1);
    }
    return [modPhase, 1];
  },
  sdm(phase, prColor) {
    const speedRate = mapUnaryTo(prColor, 1, 100);
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
    const y3 = mixValue(y1, y2, prColor);
    const modPhase = mixValue(y1, y3, prColor);
    return [modPhase, speedRate];
  },
  creep(phase, prColor) {
    const speedRate = 1 + prColor * 31;
    const gainRight = mapUnaryTo(prColor, 1, 0);
    const y = -Math.cos(invPower2(phase) * Pi * speedRate) * 0.5 + 0.5;
    const gain = mapUnaryTo(phase, 1, gainRight);
    const gain2 = mapUnaryTo(invPower2(prColor), 1, 1.07);
    const modPhase = clampValue(y * gain * gain2, 0, 1);
    return [modPhase, speedRate];
  },
  creep2(x, a) {
    const speedRate = 1 + power2(a) * 31;
    const y = -Math.cos(x * Pi * speedRate) * 0.5 + 0.5;
    const g = Math.sin(x * Math.PI * 0.5);
    const modPhase = y * g;
    return [modPhase, speedRate];
  },
  squash(phase, prColor) {
    const ca = power2(prColor) * 4 * Math.tanh(3 * (2 * phase - 1));
    const modPhase = fracPart(phase + ca);
    const g = 1;
    return [modPhase * g, 1 + prColor * 4];
  },
  sinus(phase, prColor) {
    const modPhase = -Math.cos(phase * Pi * (1 + prColor * 15)) * 0.5 + 0.5;
    const maxSlope = HalfPi * (1 + prColor * 15);
    return [modPhase, maxSlope];
  },
  ridge(phase, prColor) {
    const speedRate = 1 + prColor * 15;
    const modPhase = Math.abs(Math.sin(phase * HalfPi * speedRate));
    return [modPhase, speedRate];
  },
  screw(x, a) {
    const speedRate = 1 + a * 7;
    const y = (x * speedRate) % 1;
    const modPhase = y * x;
    return [modPhase, speedRate];
  },
} satisfies Record<string, PhaseTweakFn>;
const randomSequence = seqNumbers(200).map(() => Math.random());
