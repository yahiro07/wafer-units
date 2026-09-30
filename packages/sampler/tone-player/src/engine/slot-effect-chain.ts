import { SlotParameters } from "@/definitions/definitions";
import { MasterMixer, SlotEffectChain } from "@/definitions/interfaces";
import { createTiltingEq } from "@/engine/tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";

export function createSlotEffectChain(
  ac: AudioContext,
  masterMixer: MasterMixer,
): SlotEffectChain {
  const inputNode = ac.createGain();

  const tiltingEqNode = createTiltingEq(ac);
  const pannerNode = ac.createStereoPanner();

  const pivotNode = ac.createGain();

  const mainGainNode = ac.createGain();
  const auxGainNode = ac.createGain();

  const disconnectsChain = connectNodes(
    inputNode,
    tiltingEqNode,
    pannerNode,
    pivotNode,
  );
  const disconnectsMainOut = connectNodes(
    pivotNode,
    mainGainNode,
    masterMixer.mainInputNode,
  );
  const disconnectsAuxOut = connectNodes(
    pivotNode,
    auxGainNode,
    masterMixer.auxInputNode,
  );

  return {
    inputNode,
    setParameters(pr: SlotParameters) {
      tiltingEqNode.update({ prFreq: 0.5, prTilt: pr.eq });
      pannerNode.pan.value = pr.pan;
      mainGainNode.gain.value = pr.volume;
      auxGainNode.gain.value = pr.aux;

      // pannerNode.pan.linearRampToValueAtTime(pr.pan, ac.currentTime + 0.01);
      // mainGainNode.gain.linearRampToValueAtTime(
      //   pr.volume,
      //   ac.currentTime + 0.01,
      // );
      // auxGainNode.gain.linearRampToValueAtTime(pr.aux, ac.currentTime + 0.01);
    },
    cleanup() {
      disconnectsChain();
      disconnectsMainOut();
      disconnectsAuxOut();
    },
  };
}
