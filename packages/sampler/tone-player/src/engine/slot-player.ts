import {
  SlotParameters,
  defaultSlotParameters,
} from "@/definitions/definitions";
import {
  MasterMixer,
  AudioFetcher,
  SlotPlayer,
} from "@/definitions/interfaces";
import { createSampleSourcePlayer } from "@/engine/sample-source-player";
import { createSlotEffectChain } from "@/engine/slot-effect-chain";

export function createSlotPlayer(
  audioContext: AudioContext,
  masterMixer: MasterMixer,
  audioFetcher: AudioFetcher,
): SlotPlayer {
  const slotParameters: SlotParameters = { ...defaultSlotParameters };

  const slotEffectChain = createSlotEffectChain(audioContext, masterMixer);

  const sourcePlayer = createSampleSourcePlayer(
    audioContext,
    slotEffectChain.inputNode,
    audioFetcher,
  );
  return {
    setAudio(uri) {
      sourcePlayer.setAudio(uri);
    },
    trigger() {
      const speedRate = 2 ** ((slotParameters.speed * 2 - 1) * 0.5);
      sourcePlayer.trigger({ speedRate });
    },
    setParameters(attrs) {
      Object.assign(slotParameters, attrs);
      slotEffectChain.setParameters(slotParameters);
    },
    cleanup() {
      sourcePlayer.cleanup();
    },
  };
}
