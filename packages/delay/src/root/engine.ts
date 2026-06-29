import { UnitInterface } from "wafer-host/unit-types";
import { createStepDelayEffect } from "@/root/step-delay-effect";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const effect = createStepDelayEffect(audioContext);
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    setup() {
      unitInterface?.audioInputNode.connect(effect.inputNode);
      effect.outputNode.connect(destinationNode);
    },
    teardown() {
      unitInterface?.audioInputNode.disconnect(effect.inputNode);
      effect.outputNode.disconnect(destinationNode);
    },
    setParameters: effect.setParameters,
    setBpm: effect.setBpm,
  };
}
