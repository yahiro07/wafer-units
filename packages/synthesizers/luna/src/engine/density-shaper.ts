import { createShaperCurveBufferCache } from "@/engine/shaper-curve-buffer-cache";
import { mapUnaryTo, tunableSigmoid } from "@/engine/synth-math-utils";

function fillDensityShaperCurveBuffer(
  curveBuffer: Float32Array,
  _wave: number,
  level: number,
) {
  const sz = curveBuffer.length;
  const k = mapUnaryTo(level, 0, -0.9);
  // const g = mapUnaryTo(level, 1, 0.5);
  const g = 1;
  for (let i = 0; i < sz; i++) {
    const input = (i / (sz - 1)) * 2 - 1;
    const y = tunableSigmoid(input, k) * g;
    curveBuffer[i] = y;
  }
}

const densityShaperCurveBufferCache = createShaperCurveBufferCache(
  1024,
  fillDensityShaperCurveBuffer,
);

export function createDensityShaper(audioContext: AudioContext) {
  const shaperNode = audioContext.createWaveShaper();
  shaperNode.oversample = "2x";
  return {
    shaperNode,
    updateNodeParameters(level: number) {
      const curve = densityShaperCurveBufferCache.update(-1, level);
      if (shaperNode.curve !== curve) {
        shaperNode.curve = curve;
      }
    },
  };
}
