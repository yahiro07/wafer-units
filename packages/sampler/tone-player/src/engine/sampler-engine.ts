import {
  AudioFetcher,
  MasterMixer,
  SamplerEngine,
} from "@/definitions/interfaces";
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
  masterMixer: MasterMixer,
  audioFetcher: AudioFetcher,
): SlotPlayer {
  const slotParameters: SlotParameters = { ...defaultSlotParameters };

  const tmpNode = audioContext.createGain();

  const sourcePlayer = createSampleSourcePlayer(
    audioContext,
    tmpNode,
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
