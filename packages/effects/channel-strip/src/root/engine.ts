import { UnitInterface } from "wafer-host/unit-types";
import { defaultEffectParameters } from "@/common/definitions";
import { createChannelStripEffect } from "@/root/channel-strip-effect";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const effect = createChannelStripEffect(
    audioContext,
    defaultEffectParameters,
  );
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    setParameters: effect.setParameters,
    connects() {
      unitInterface?.audioInputNode.connect(effect.inputNode);
      effect.outputNode.connect(destinationNode);
    },
    disconnects() {
      unitInterface?.audioInputNode.disconnect(effect.inputNode);
      effect.outputNode.disconnect(destinationNode);
      effect.cleanup();
    },
  };
}
