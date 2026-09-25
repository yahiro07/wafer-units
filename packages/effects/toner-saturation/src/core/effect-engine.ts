import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";
import { createSaturationEffect } from "@/core/saturation";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const saturation = createSaturationEffect(ac);

  connectNodes(inputNode, saturation, outputNode);

  return {
    setParameters(parameters) {
      saturation.update(parameters);
    },
    cleanup() {
      disconnectNodes(inputNode, saturation, outputNode);
    },
  };
}
