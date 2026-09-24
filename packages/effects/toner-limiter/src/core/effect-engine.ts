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

  compressor.knee.value = 0;
  compressor.ratio.value = 20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;

  connectNodes(inputNode, compressor, outputNode);

  return {
    setParameters(pr) {
      compressor.threshold.value = mapUnaryTo(pr.ceiling, -12, 0);
    },
    cleanup() {
      disconnectNodes(inputNode, compressor, outputNode);
    },
  };
}
