import { UnitInterface } from "wafer-host/unit-types";
import { mapUnaryTo } from "@lib/mu2609/utils/synth-math-utils";
import { createConnectionKeeper } from "@lib/mu2609/utils/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";
import { EffectEngine } from "@/core/interfaces";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const sideChainInputNode =
    unitInterface?.createAdditionalAudioInputNode("SC") ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;

  const inputGainNode = ac.createGain();
  const compressorNode = ac.createDynamicsCompressor();
  const outputGainNode = ac.createGain();

  const connectionKeeper = createConnectionKeeper();
  const flags = {
    effectEnabled: true,
    sideChain: false,
  };

  const updateConnection = () => {
    const { effectEnabled, sideChain } = flags;
    if (effectEnabled) {
      connectionKeeper.connects(
        inputNode,
        inputGainNode,
        compressorNode,
        outputGainNode,
        outputNode,
      );
    } else {
      connectionKeeper.connects(inputNode, outputNode);
    }
  };

  updateConnection();

  return {
    ioNodeSuit: { inputNode, sideChainInputNode, outputNode },
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

      compressorNode.threshold.setValueAtTime(
        mapUnaryTo(pr.threshold, -40, 0),
        now,
      );
      compressorNode.ratio.setValueAtTime(mapUnaryTo(pr.ratio, 1, 20), now);
      compressorNode.knee.setValueAtTime(mapUnaryTo(pr.knee, 0, 40), now);
      compressorNode.attack.setValueAtTime(
        mapUnaryTo(pr.attack, 0.001, 0.08),
        now,
      );
      compressorNode.release.setValueAtTime(
        mapUnaryTo(pr.release, 0.05, 0.5),
        now,
      );
    },
    setEnabled(enabled) {
      flags.effectEnabled = enabled;
      updateConnection();
    },
    setSideChain(sideChain) {
      flags.sideChain = sideChain;
      updateConnection();
    },
    cleanup() {
      connectionKeeper.cleanup();
    },
  };
}
