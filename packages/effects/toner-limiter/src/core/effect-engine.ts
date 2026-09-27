import { UnitInterface } from "wafer-host/unit-types";
import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";
import { EffectEngine } from "@/core/interfaces";
import { mapUnaryTo } from "@lib/mu2609/utils/synth-math-utils";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;
  const inputGain = ac.createGain();
  const compressor = ac.createDynamicsCompressor();
  const outputGain = ac.createGain();

  compressor.knee.value = 0;
  compressor.ratio.value = 20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;

  connectNodes(inputNode, inputGain, compressor, outputGain, outputNode);

  return {
    setParameters(pr) {
      const inputDb = mapUnaryTo(pr.inputGain, -80, 80);
      const inputGainValue = 10 ** (inputDb / 20);
      inputGain.gain.linearRampToValueAtTime(
        inputGainValue,
        ac.currentTime + 0.02,
      );
      const threshold = mapUnaryTo(pr.ceiling, -24, -0.1);
      compressor.threshold.value = threshold;
      if (0) {
        outputGain.gain.value = 10 ** ((0.6 * threshold * (1 - 1 / 20)) / 20);
      }
    },
    cleanup() {
      disconnectNodes(inputNode, inputGain, compressor, outputGain, outputNode);
    },
  };
}
