import { mapUnaryTo } from "beams/ax/number-utils";
import { tunableSigmoid } from "beams/mo-synthesis/synth-math-utils";
import { createEffectWrapper } from "@/synthesis/effect-wrapper";
import { createShaperCurveBufferCache } from "@/synthesis/shaper-curve-buffer-cache";

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

export function createDensityShaperBlock(audioContext: AudioContext) {
  const shaperNode = audioContext.createWaveShaper();
  shaperNode.oversample = "2x";
  const wrapper = createEffectWrapper(audioContext, shaperNode);
  return {
    inputNode: wrapper.inputNode,
    outputNode: wrapper.outputNode,
    setupNodes: wrapper.setupNodes,
    cleanupNodes: wrapper.cleanupNodes,
    updateNodeParameters(params: { enabled: boolean; level: number }) {
      wrapper.setEnabled(params.enabled);
      const curve = densityShaperCurveBufferCache.update(-1, params.level);
      if (shaperNode.curve !== curve) {
        shaperNode.curve = curve;
      }
    },
  };
}
