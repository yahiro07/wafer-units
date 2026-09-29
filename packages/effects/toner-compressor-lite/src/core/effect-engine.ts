import { UnitInterface } from "wafer-host/unit-types";
import { mapUnaryTo } from "@lib/mu2609/utils/synth-math-utils";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";
import { EffectEngine } from "@/core/interfaces";
import { parameterMapper } from "@/core/parameter-mapper";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;

  const inputGainNode = ac.createGain();
  const compressor = ac.createDynamicsCompressor();
  const outputGainNode = ac.createGain();

  connectNodes(
    inputNode,
    inputGainNode,
    compressor,
    outputGainNode,
    outputNode,
  );
  return {
    setParameters(pr) {
      const now = ac.currentTime;
      inputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.inputGain),
        now,
      );
      outputGainNode.gain.setValueAtTime(
        mapKnobCurveCenterUnity(pr.outputGain),
        now,
      );

      const th = parameterMapper.mapThreshold(pr.threshold);
      const ratio = parameterMapper.mapRatio(pr.ratio);
      const knee = parameterMapper.mapKnee(pr.knee);

      compressor.threshold.setValueAtTime(th, now);
      compressor.ratio.setValueAtTime(ratio, now);
      compressor.knee.setValueAtTime(knee, now);
      compressor.attack.setValueAtTime(mapUnaryTo(pr.attack, 0.001, 0.08), now);
      compressor.release.setValueAtTime(mapUnaryTo(pr.release, 0.05, 0.5), now);
    },
    cleanup() {
      disconnectNodes(
        inputNode,
        inputGainNode,
        compressor,
        outputGainNode,
        outputNode,
      );
    },
  };
}
