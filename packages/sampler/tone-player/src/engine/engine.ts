import { UnitInterface } from "wafer-host/unit-types";
import { SamplerEngine } from "@/definitions/types";
import { createSamplePlayer } from "@/engine/sample-player";

const levelsCacheLoader = {
  load() {
    const text = sessionStorage.getItem("tone-player-levels-cache");
    if (text) {
      try {
        return JSON.parse(text);
      } catch (error) {
        return {};
      }
    }
    return {};
  },
  save(levelsCache: Record<string, number[]>) {
    sessionStorage.setItem(
      "tone-player-levels-cache",
      JSON.stringify(levelsCache),
    );
  },
};

export function createSamplerEngine(
  unitInterface: UnitInterface | undefined,
): SamplerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const samplePlayer = createSamplePlayer(audioContext, destinationNode);

  //audio full uri --> levels
  // const levelsCache: Record<string, number[]> = {};
  const levelsCache = levelsCacheLoader.load();

  return {
    setSourceSpec(sourceSpec) {},
    setSlots(slots) {},
    loadLevels(url) {
      //if the url is not included in the sourceSpec, skip load and raise error
      return Promise.resolve([]);
    },
    setCommonParameters(commonParameters) {},
    cleanup() {},
    trigger(audioIndex, skipIfNotLoaded) {},
  };
}
