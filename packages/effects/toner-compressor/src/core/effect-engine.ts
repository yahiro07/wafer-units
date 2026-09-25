import { UnitInterface } from "wafer-host/unit-types";
import { mapUnaryTo } from "@lib/mu2609/utils/synth-math-utils";
import { createConnectionKeeper } from "@lib/mu2609/utils/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";
import { EffectEngine } from "@/core/interfaces";
import { createCustomCompressor } from "@/core/custom-compressor";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
): EffectEngine {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const inputNode = unitInterface?.audioInputNode ?? ac.createGain();
  const sideChainInputNode =
    unitInterface?.createAdditionalAudioInputNode("SC") ?? ac.createGain();
  const outputNode = unitInterface?.audioOutputNode ?? ac.destination;

  const inputGainNode = ac.createGain();
  const compressor = createCustomCompressor(ac);
  const outputGainNode = ac.createGain();

  const connectionKeeper = createConnectionKeeper();
  const detectorKeeper = createConnectionKeeper();
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
        compressor,
        outputGainNode,
        outputNode,
      );
      detectorKeeper.connects(
        sideChain ? sideChainInputNode : inputGainNode,
        compressor.detectorNode,
      );
    } else {
      connectionKeeper.connects(inputNode, outputNode);
      detectorKeeper.cleanup();
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

      compressor.threshold.setValueAtTime(
        mapUnaryTo(pr.threshold, -40, 0),
        now,
      );
      compressor.ratio.setValueAtTime(mapUnaryTo(pr.ratio, 1, 20), now);
      compressor.knee.setValueAtTime(mapUnaryTo(pr.knee, 0, 40), now);
      compressor.attack.setValueAtTime(mapUnaryTo(pr.attack, 0.001, 0.08), now);
      compressor.release.setValueAtTime(mapUnaryTo(pr.release, 0.05, 0.5), now);
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
      detectorKeeper.cleanup();
      compressor.cleanup();
    },
  };
}
