import {
  AudioFetcher,
  MasterMixer,
  SamplerEngine,
} from "@/definitions/interfaces";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { createSlotPlayer } from "@/engine/slot-player";

export function createSamplerEngine(
  audioContext: AudioContext,
  masterMixer: MasterMixer,
  audioFetcher: AudioFetcher,
): SamplerEngine {
  const slotPlayers = seqNumbers(12).map(() =>
    createSlotPlayer(audioContext, masterMixer, audioFetcher),
  );
  return {
    setSlotAudio(slotIndex, uri) {
      slotPlayers[slotIndex].setAudio(uri);
    },
    setSlotParameters(slotIndex, parameters) {
      slotPlayers[slotIndex].setParameters(parameters);
    },
    trigger(slotIndex) {
      slotPlayers[slotIndex].trigger();
    },
    cleanup() {
      for (const slotPlayer of slotPlayers) {
        slotPlayer.cleanup();
      }
    },
  };
}
