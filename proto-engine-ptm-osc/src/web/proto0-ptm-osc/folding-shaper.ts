import { power2 } from "@/utils/synth-math-utils";
import { createEffectWrapper } from "@/web/proto0-ptm-osc/effect-wrapper";
import { createShaperCurveBufferCache } from "@/web/proto0-ptm-osc/shaper-curve-buffer-cache";

export enum FoldingShaperWave {
  ws1 = 0,
  ws2,
  ws3,
  ws4,
  ws5,
  // count,
}
export const numFoldingShaperWaves = 5;

function wrapBipolar<T extends unknown[]>(
  fn: (x: number, ...restArgs: T) => number,
) {
  return (_x: number, ...restArgs: T) => {
    const sign = Math.sign(_x);
    const x = Math.abs(_x);
    const y = fn(x, ...restArgs);
    return sign * y;
  };
}

const shaperCore = {
  foldSine(x: number) {
    return Math.sin(x * Math.PI * 0.5);
  },
  foldSineHalf: wrapBipolar((_x) => {
    const sign = Math.sign(_x);
    const x = Math.abs(_x);
    let y = 0;
    if (x < 1) {
      y = Math.sin((x * Math.PI) / 2);
    } else {
      y = 1 - (1 - Math.sin((x * Math.PI) / 2) ** 2);
    }
    return sign * y;
  }),
  foldTriangle(x: number) {
    const t = (((x + 1) % 4) + 4) % 4;
    return t < 2 ? t - 1 : 3 - t;
  },
  foldTriangleHalf: wrapBipolar((x) => {
    return Math.abs(((x + 1) % 2) - 1);
  }),
  foldSaw: wrapBipolar((x) => {
    let y = x - Math.floor(x);
    if (((x >> 0) & 1) === 1) y -= 1;
    return y;
  }),
  foldSawHalf(x: number) {
    const sign = Math.sign(x);
    let level = Math.abs(x);
    level %= 1;
    return sign * level;
  },
  foldPolyHalf: wrapBipolar((x) => {
    if (x < 1) return x;
    if (0) {
      return (x & 1) === 1 ? 1 : 0;
    } else {
      if (x < 2) return 1;
      return ((x / 2) & 1) === 0 ? 1 : 0;
    }
  }),
};

const foldingShaperSpecs: Record<
  FoldingShaperWave,
  { shaperCoreKey: keyof typeof shaperCore; maxGain: number }
> = {
  [FoldingShaperWave.ws1]: { shaperCoreKey: "foldSine", maxGain: 24 },
  [FoldingShaperWave.ws2]: { shaperCoreKey: "foldSawHalf", maxGain: 8 },
  [FoldingShaperWave.ws3]: { shaperCoreKey: "foldPolyHalf", maxGain: 8 },
  [FoldingShaperWave.ws4]: { shaperCoreKey: "foldTriangle", maxGain: 12 },
  [FoldingShaperWave.ws5]: { shaperCoreKey: "foldSaw", maxGain: 12 },
};

function fillFoldingShaperCurveBuffer(
  curveBuffer: Float32Array,
  wave: number,
  level: number,
) {
  const sz = curveBuffer.length;
  const spec = foldingShaperSpecs[wave as FoldingShaperWave];
  const foldingFn = shaperCore[spec.shaperCoreKey];
  for (let i = 0; i < sz; i++) {
    const input = (i / (sz - 1)) * 2 - 1;
    const x = input * (1 + power2(level) * spec.maxGain);
    const y = foldingFn(x);
    curveBuffer[i] = y;
  }
}

const foldingShaperCurveBufferCache = createShaperCurveBufferCache(
  1024,
  fillFoldingShaperCurveBuffer,
);

export function createFoldingShaperBlock(audioContext: AudioContext) {
  const shaperNode = audioContext.createWaveShaper();
  shaperNode.oversample = "4x";
  const wrapper = createEffectWrapper(audioContext, shaperNode);
  return {
    inputNode: wrapper.inputNode,
    outputNode: wrapper.outputNode,
    setupNodes: wrapper.setupNodes,
    cleanupNodes: wrapper.cleanupNodes,
    updateNodeParameters(params: {
      enabled: boolean;
      wave: number;
      level: number;
    }) {
      wrapper.setEnabled(params.enabled);
      const curve = foldingShaperCurveBufferCache.update(
        params.wave,
        params.level,
      );
      if (shaperNode.curve !== curve) {
        shaperNode.curve = curve;
      }
    },
  };
}
