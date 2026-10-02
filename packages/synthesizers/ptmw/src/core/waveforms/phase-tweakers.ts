import { seqNumbers, mapUnaryTo } from "@lib/mu2609/utils/helpers";
import { power2, fracPart, mixValue } from "@lib/mu2609/utils/synth-math-utils";

const randomSequence = seqNumbers(200).map(() => Math.random());
export const phaseTweakers = {
  speed(phase, color) {
    const rate = 1 + color * 15;
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
