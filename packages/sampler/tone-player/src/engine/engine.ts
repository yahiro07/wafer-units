import { UnitInterface } from "wafer-host/unit-types";
import { SamplerEngine } from "@/definitions/types";
import { createSamplePlayer } from "@/engine/sample-player";

export function createSamplerEngine(
  unitInterface: UnitInterface | undefined,
): SamplerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const samplePlayer = createSamplePlayer(audioContext, destinationNode);
  return {
    setSourceSpec(sourceSpec) {},
    setSlots(slots) {},
    loadLevels(audioIndex) {
      return Promise.resolve([]);
    },
    setCommonParameters(commonParameters) {},
    cleanup() {},
    trigger(audioIndex, skipIfNotLoaded) {},
  };
}
