import {
  seqNumbers,
  mapUnaryTo,
  linearInterpolate,
  clampValue,
} from "@lib/mu2609/utils/helpers";
import {
  power2,
  mixValue,
  invPower2,
  fracPart,
} from "@lib/mu2609/utils/synth-math-utils";

const randomSequence = seqNumbers(200).map(() => Math.random());
export const phaseTweakers = {
  sfm(phase, color) {
    const fmRatio = mapUnaryTo(color, 1, 4);
    const fmDepth = color * 2;
    const fmOscValue = Math.sin(2 * Math.PI * phase * fmRatio);
    return fracPart(phase + fmOscValue * fmDepth);
  },
  speed(phase, color) {
    const rate = 1 + color * 15;
    return (phase * rate) % 1;
  },
  accel(phase, color) {
    const rate = 1 + power2(color) * 8;
    return power2(phase * rate) % 1;
  },
  sdm(phase, color) {
    const speedRate = mapUnaryTo(invPower2(color), 1, 100);
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
  drill(_x, _a) {
    const a = mapUnaryTo(_a, 0.25, 1);
    const x = _x;
    const speedRate = 1 + power2(a) * 15;
    const x1Raw = x * speedRate;
    const x1 = x1Raw % 1;
    let y1 = x1 < 0.5 ? 0 : 1;
    if (x1Raw < 2) y1 = 1;
    return (x * y1) % 1;
  },
  pw(phase, a) {
    const b = mapUnaryTo(a, 0.5, 0.05);
    const modPhase =
      phase < b ? (phase / b) * 0.5 : 0.5 + ((phase - b) / (1 - b)) * 0.5;
    return modPhase;
  },
  "sub-pw"(phase, prColor) {
    const bp = mapUnaryTo(prColor, 0.5, 0.05);
    let modPhase = 0;
    if (phase < bp) {
      modPhase = phase / bp;
    } else {
      modPhase = linearInterpolate(phase, bp, 1, 0, 1);
    }
    return modPhase;
  },
  creep(phase, prColor) {
    const speedRate = 1 + prColor * 31;
    const gainRight = mapUnaryTo(prColor, 1, 0);
    const y = -Math.cos(invPower2(phase) * Math.PI * speedRate) * 0.5 + 0.5;
    const gain = mapUnaryTo(phase, 1, gainRight);
    const gain2 = mapUnaryTo(invPower2(prColor), 1, 1.07);
    return clampValue(y * gain * gain2, 0, 1);
  },
  creep2(x, a) {
    const speedRate = 1 + power2(a) * 31;
    const y = -Math.cos(x * Math.PI * speedRate) * 0.5 + 0.5;
    const g = Math.sin(x * Math.PI * 0.5);
    return y * g;
  },
  squash(phase, prColor) {
    const ca = power2(prColor) * 4 * Math.tanh(3 * (2 * phase - 1));
    return fracPart(phase + ca);
  },
  sinus(phase, prColor) {
    const modPhase =
      -Math.cos(phase * Math.PI * (1 + prColor * 15)) * 0.5 + 0.5;
    return modPhase;
  },
  ridge(phase, prColor) {
    const speedRate = 1 + prColor * 15;
    return Math.abs(Math.sin(phase * Math.PI * 0.5 * speedRate));
  },
  screw(x, a) {
    const speedRate = 1 + a * 7;
    const y = (x * speedRate) % 1;
    return y * x;
  },
} satisfies Record<string, (phase: number, color: number) => number>;
