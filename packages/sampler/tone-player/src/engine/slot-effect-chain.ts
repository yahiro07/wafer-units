import { SlotParameters } from "@/definitions/definitions";
import { MasterMixer, SlotEffectChain } from "@/definitions/interfaces";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";

export function createSlotEffectChain(
  audioContext: AudioContext,
  masterMixer: MasterMixer,
): SlotEffectChain {
  const inputNode = audioContext.createGain();
  const pivotNode = audioContext.createGain();

  const mainGainNode = audioContext.createGain();
  const auxGainNode = audioContext.createGain();

  const disconnects1 = connectNodes(inputNode, pivotNode);
  const disconnects2 = connectNodes(
    pivotNode,
    mainGainNode,
    masterMixer.mainInputNode,
  );
  const disconnects3 = connectNodes(
    pivotNode,
    auxGainNode,
    masterMixer.auxInputNode,
  );

  return {
    inputNode,
    setParameters(parameters: SlotParameters) {
      mainGainNode.gain.linearRampToValueAtTime(
        parameters.volume,
        audioContext.currentTime + 0.01,
      );
      auxGainNode.gain.linearRampToValueAtTime(
        parameters.aux,
        audioContext.currentTime + 0.01,
      );
    },
    cleanup() {
      disconnects1();
      disconnects2();
      disconnects3();
    },
  };
}
