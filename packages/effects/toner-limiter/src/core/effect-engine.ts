import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";
import { mapUnaryTo } from "@lib/mu2609/utils/synth-math-utils";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const compressor = ac.createDynamicsCompressor();
  const outputGain = ac.createGain();

  compressor.knee.value = 0;
  compressor.ratio.value = 20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;

  connectNodes(inputNode, compressor, outputGain, outputNode);

  return {
    setParameters(pr) {
      const threshold = mapUnaryTo(pr.ceiling, -6, 0);
      compressor.threshold.value = threshold;
      if (1) {
        outputGain.gain.value = 10 ** ((0.6 * threshold * (1 - 1 / 20)) / 20);
      }
    },
    cleanup() {
      disconnectNodes(inputNode, compressor, outputGain, outputNode);
    },
  };
}
