import { CommonParameters } from "@/definitions/definitions";
import { MasterMixer } from "@/definitions/interfaces";
import { UnitInterface } from "wafer-host/unit-types";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";

export function createMasterMixer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): MasterMixer {
  const mainInputNode = audioContext.createGain();
  const auxInputNode = audioContext.createGain();

  const mainOutputNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const auxOutputNode =
    unitInterface?.createAdditionalAudioOutputNode("aux") ??
    audioContext.createGain();

  const mainGainNode = audioContext.createGain();
  const auxGainNode = audioContext.createGain();

  const disconnectsMain = connectNodes(
    mainInputNode,
    mainGainNode,
    mainOutputNode,
  );
  const disconnectsAux = connectNodes(auxInputNode, auxGainNode, auxOutputNode);

  return {
    mainInputNode,
    auxInputNode,
    setCommonParameters(params: CommonParameters) {
      mainGainNode.gain.linearRampToValueAtTime(
        params.mainLevel,
        audioContext.currentTime + 0.01,
      );
      auxGainNode.gain.linearRampToValueAtTime(
        params.auxLevel,
        audioContext.currentTime + 0.01,
      );
    },
    cleanup() {
      disconnectsMain();
      disconnectsAux();
    },
  };
}
