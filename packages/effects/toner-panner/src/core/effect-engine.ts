import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const pannerNode = ac.createStereoPanner();

  connectNodes(inputNode, pannerNode, outputNode);

  return {
    setParameters(pr) {
      pannerNode.pan.setValueAtTime(pr.pan, ac.currentTime + 0.01);
    },
    cleanup() {
      disconnectNodes(inputNode, pannerNode, outputNode);
    },
  };
}
