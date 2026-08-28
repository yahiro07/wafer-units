import { createShaperCurveBufferCache } from "@/engine/shaper-curve-buffer-cache";
import { mapUnaryTo, tunableSigmoid } from "@/utils/synth-math-utils";

const INPUT_HEADROOM = 4;

function fillDensityShaperCurveBuffer(
  curveBuffer: Float32Array,
  level: number,
) {
  const sz = curveBuffer.length;
  const k = mapUnaryTo(level, 0, -0.9);
  const g = 1 - level * 0.4;
  for (let i = 0; i < sz; i++) {
    const input = (i / (sz - 1)) * 2 - 1;
    curveBuffer[i] =
      (tunableSigmoid(input * INPUT_HEADROOM, k) / INPUT_HEADROOM) * g;
  }
}

const densityShaperCurveBufferCache = createShaperCurveBufferCache(
  1024,
  fillDensityShaperCurveBuffer,
);

export function createDensityShaper(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const shaperNode = audioContext.createWaveShaper();
  const outputNode = audioContext.createGain();
  shaperNode.oversample = "2x";
  inputNode.connect(outputNode);

  let shaperEnabled = false;

  function setShaperEnabled(enabled: boolean) {
    if (enabled === shaperEnabled) return;
    shaperEnabled = enabled;
    if (enabled) {
      inputNode.disconnect(outputNode);
      inputNode.connect(shaperNode);
      shaperNode.connect(outputNode);
      return;
    }
    inputNode.disconnect(shaperNode);
    shaperNode.disconnect(outputNode);
    inputNode.connect(outputNode);
  }

  let lastSetCurve: Float32Array | null = null;

  return {
    inputNode,
    outputNode,
    update(level: number) {
      level = level ** 2;

      const enabled = level > 0;
      if (enabled) {
        const steppedLevelKey = Math.floor(level * 10);
        const steppedLevel = steppedLevelKey / 10;
        const curve = densityShaperCurveBufferCache.getCached(
          steppedLevelKey,
          steppedLevel,
        );
        if (curve !== lastSetCurve) {
          shaperNode.curve = curve;
          lastSetCurve = curve;
        }
        const scaler = mapUnaryTo(level, 0.1, 1);
        inputNode.gain.value = (1 / INPUT_HEADROOM) * scaler;
        outputNode.gain.value = INPUT_HEADROOM / scaler;
      } else {
        inputNode.gain.value = 1;
        outputNode.gain.value = 1;
      }
      setShaperEnabled(enabled);
    },
    cleanup() {
      inputNode.disconnect();
      shaperNode.disconnect();
      outputNode.disconnect();
    },
  };
}
