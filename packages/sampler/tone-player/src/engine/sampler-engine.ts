import { UnitInterface } from "wafer-host/unit-types";
import { createSamplePlayer } from "@/engine/sample-player";
import { AudioFetcher, SamplerEngine } from "@/definitions/interfaces";

export function createSamplerEngine(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
  audioDestination: AudioNode,
  audioFetcher: AudioFetcher,
): SamplerEngine {
  const samplePlayer = createSamplePlayer(audioContext, audioDestination);

  return {
    setSlotAudio(slotIndex, uri) {},
    setSlotParameters(slotIndex, parameters) {},
    trigger(slotIndex, skipIfNotLoaded) {},
    cleanup() {},
  };
}
