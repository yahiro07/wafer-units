import { CommonParameters } from "@/definitions/definitions";
import { MasterMixer } from "@/definitions/interfaces";
import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  createConnectionKeeper,
} from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "@/engine/reverb";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";

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
    audioContext.destination;

  const mainGainNode = audioContext.createGain();
  const auxGainNode = audioContext.createGain();

  const reverb = createReverb(audioContext);

  const disconnectsMain = connectNodes(
    mainInputNode,
    mainGainNode,
    mainOutputNode,
  );
  const disconnectsAux = connectNodes(auxInputNode, auxGainNode, auxOutputNode);

  const reverbConnectionKeeper = createConnectionKeeper();
  reverbConnectionKeeper.connects();

  return {
    mainInputNode,
    auxInputNode,
    setCommonParameters(params: CommonParameters) {
      if (params.reverbOn) {
        reverbConnectionKeeper.connects(auxInputNode, reverb, mainGainNode);
        reverb.apply({
          decay: params.reverbTime,
          damp: params.reverbTone,
          mix: params.reverbMix,
        });
      } else {
        reverbConnectionKeeper.connects();
      }
      mainGainNode.gain.linearRampToValueAtTime(
        mapKnobCurveCenterUnity(params.mainLevel),
        audioContext.currentTime + 0.01,
      );
      auxGainNode.gain.linearRampToValueAtTime(
        mapKnobCurveCenterUnity(params.auxLevel),
        audioContext.currentTime + 0.01,
      );
    },
    cleanup() {
      disconnectsMain();
      disconnectsAux();
      reverbConnectionKeeper.cleanup();
    },
  };
}
