import { UnitInterface } from "wafer-host/unit-types";
import { createSamplePlayer } from "@/engine/sample-player";
import { SamplerEngine } from "@/definitions/interfaces";

// const levelsCacheLoader = {
//   load() {
//     const text = sessionStorage.getItem("tone-player-levels-cache");
//     if (text) {
//       try {
//         return JSON.parse(text);
//       } catch (error) {
//         return {};
//       }
//     }
//     return {};
//   },
//   save(levelsCache: Record<string, number[]>) {
//     sessionStorage.setItem(
//       "tone-player-levels-cache",
//       JSON.stringify(levelsCache),
//     );
//   },
// };

export function createSamplerEngine(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): SamplerEngine {
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const samplePlayer = createSamplePlayer(audioContext, destinationNode);

  //audio full uri --> levels
  // const levelsCache: Record<string, number[]> = {};
  // const levelsCache = levelsCacheLoader.load();

  return {
    setSourceSpec(sourceSpec) {},
    setSlots(slots) {},
    setCommonParameters(commonParameters) {},
    cleanup() {},
    trigger(audioIndex, skipIfNotLoaded) {},
  };
}
