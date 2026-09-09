import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/core/definitions";
import { mapUnaryTo, power2 } from "@lib/mu2609/utils/synth-math-utils";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;

  const inputGainNode = ac.createGain();
  const glueCompNode = ac.createDynamicsCompressor();
  const glueMakeupNode = ac.createGain();
  const limitCompNode = ac.createDynamicsCompressor();
  const outputGainNode = ac.createGain();

  glueCompNode.ratio.value = 4;
  glueCompNode.knee.value = 8;
  limitCompNode.knee.value = 0;
  limitCompNode.attack.value = 0.002;

  connectNodes(
    inputNode,
    inputGainNode,
    glueCompNode,
    glueMakeupNode,
    limitCompNode,
    outputGainNode,
    outputNode,
  );

  return {
    setParameters(pr: EffectParameters) {
      const now = ac.currentTime;
      inputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.inputGain),
        now,
      );
      outputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.outputGain),
        now,
      );

      glueCompNode.threshold.setValueAtTime(
        mapUnaryTo(pr.threshold, -40, 0),
        now,
      );
      glueCompNode.attack.setValueAtTime(
        mapUnaryTo(pr.attack, 0.001, 0.08),
        now,
      );
      glueCompNode.release.setValueAtTime(
        mapUnaryTo(pr.release, 0.05, 0.5),
        now,
      );
      glueMakeupNode.gain.setValueAtTime(1 + power2(1 - pr.threshold) * 1, now);
    },
    cleanup() {
      disconnectNodes(
        inputNode,
        inputGainNode,
        glueCompNode,
        limitCompNode,
        outputGainNode,
      );
    },
  };
}
