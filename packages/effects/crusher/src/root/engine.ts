import { UnitInterface } from "wafer-host/unit-types";
import { defaultEffectParameters } from "@/core/definitions";
import { createLofierEffect } from "@/core/lofier-effect";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const effect = createLofierEffect(audioContext, defaultEffectParameters);
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    connects() {
      unitInterface?.audioInputNode.connect(effect.inputNode);
      effect.outputNode.connect(destinationNode);
    },
    disconnects() {
      unitInterface?.audioInputNode.disconnect(effect.inputNode);
      effect.outputNode.disconnect(destinationNode);
    },
    setParameters: effect.setParameters,
  };
}
