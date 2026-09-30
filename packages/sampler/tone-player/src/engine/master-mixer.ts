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
    audioContext.createGain();

  const mainGainNode = audioContext.createGain();
  const auxGainNode = audioContext.createGain();

  const reverb = createReverb(audioContext);

  const disconnectsMain = connectNodes(
    mainInputNode,
    mainGainNode,
    mainOutputNode,
  );

  const auxConnectionKeeper = createConnectionKeeper();
  auxConnectionKeeper.connects(auxInputNode, auxGainNode, auxOutputNode);

  return {
    mainInputNode,
    auxInputNode,
    setCommonParameters(params: CommonParameters) {
      if (params.reverbOn) {
        auxConnectionKeeper.connects(
          auxInputNode,
          reverb,
          auxGainNode,
          auxOutputNode,
        );
        reverb.apply({
          decay: params.reverbTime,
          damp: params.reverbTone,
          mix: params.reverbMix,
        });
      } else {
        auxConnectionKeeper.connects(auxInputNode, auxGainNode, auxOutputNode);
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
      auxConnectionKeeper.cleanup();
    },
  };
}
