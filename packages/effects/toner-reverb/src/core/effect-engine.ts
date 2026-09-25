import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";
import { createReverb } from "@/core/reverb";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const reverb = createReverb(ac);

  connectNodes(inputNode, reverb, outputNode);

  return {
    setParameters(pr) {
      reverb.apply(
        { decay: pr.reverbTime, mix: pr.reverbMix, damp: pr.reverbTone },
        ac.currentTime,
      );
    },
    cleanup() {
      disconnectNodes(inputNode, reverb, outputNode);
    },
  };
}
