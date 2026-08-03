import { UnitInterface } from "wafer-host/unit-types";
import { defaultEffectParameters } from "@/core/definitions";
import { createLofierEffect } from "@/core/lofier-effect";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const effect = createLofierEffect(audioContext, defaultEffectParameters);
  const sourceNode = unitInterface?.audioInputNode;
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    connects() {
      sourceNode?.connect(effect.inputNode);
      effect.outputNode.connect(destinationNode);
    },
    disconnects() {
      sourceNode?.disconnect(effect.inputNode);
      effect.outputNode.disconnect(destinationNode);
    },
    setParameters: effect.setParameters,
  };
}
