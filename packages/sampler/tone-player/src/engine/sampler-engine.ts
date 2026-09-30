import { AudioFetcher, SamplerEngine } from "@/definitions/interfaces";
import {
  defaultSlotParameters,
  SlotParameters,
} from "@/definitions/definitions";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { createSampleSourcePlayer } from "@/engine/sample-source-player";

type SlotPlayer = {
  setAudio(uri: string): void;
  trigger(): void;
  setParameters(parameters: SlotParameters): void;
  cleanup(): void;
};

function createSlotPlayer(
  audioContext: AudioContext,
  audioDestination: AudioNode,
  audioFetcher: AudioFetcher,
): SlotPlayer {
  const slotParameters: SlotParameters = { ...defaultSlotParameters };

  const sourcePlayer = createSampleSourcePlayer(
    audioContext,
    audioDestination,
    audioFetcher,
  );
  return {
    setAudio(uri) {
      sourcePlayer.setAudio(uri);
    },
    trigger() {
      sourcePlayer.trigger({
        speedRate: slotParameters.speed * 2,
      });
    },
    setParameters(attrs) {
      Object.assign(slotParameters, attrs);
    },
    cleanup() {
      sourcePlayer.cleanup();
    },
  };
}

export function createSamplerEngine(
  audioContext: AudioContext,
  audioDestination: AudioNode,
  audioFetcher: AudioFetcher,
): SamplerEngine {
  const slotPlayers = seqNumbers(12).map(() =>
    createSlotPlayer(audioContext, audioDestination, audioFetcher),
  );
  return {
    setSlotAudio(slotIndex, uri) {
      slotPlayers[slotIndex].setAudio(uri);
    },
    setSlotParameters(slotIndex, parameters) {
      slotPlayers[slotIndex].setParameters(parameters);
    },
    trigger(slotIndex, skipIfNotLoaded) {
      slotPlayers[slotIndex].trigger();
    },
    cleanup() {
      for (const slotPlayer of slotPlayers) {
        slotPlayer.cleanup();
      }
    },
  };
}
