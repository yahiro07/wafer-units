import { createChorus1 } from "@/engine/chorus1";
import { createOutputSaturator } from "@/engine/output-saturator";
import { createReverberator } from "@/engine/reverbrator";
import { iife } from "@/utils/helpers";

type EffectParameters = {
  chorusLevel: number;
  reverbLevel: number;
};

export function createEffectChain(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  const reverb = createReverberator(audioContext);
  const chorus = createChorus1(audioContext);
  const saturator = createOutputSaturator(audioContext);

  type WiringMode = "reverb" | "chorus";
  let currentWiring: WiringMode | null = null;

  inputNode.connect(saturator.inputNode);
  saturator.outputNode.connect(outputNode);

  const internal = {
    cleanupMiddleWiring() {
      if (currentWiring === "reverb") {
        inputNode.disconnect();
        reverb.outputNode.disconnect();
      } else if (currentWiring === "chorus") {
        inputNode.disconnect();
        chorus.outputNode.disconnect();
      } else {
        inputNode.disconnect();
      }
    },
    setupMiddleWiring(nextWiring: WiringMode | null) {
      if (nextWiring === "reverb") {
        inputNode.connect(reverb.inputNode);
        reverb.outputNode.connect(saturator.inputNode);
      } else if (nextWiring === "chorus") {
        inputNode.connect(chorus.inputNode);
        chorus.outputNode.connect(saturator.inputNode);
      } else {
        inputNode.connect(saturator.inputNode);
      }
    },
  };

  return {
    inputNode,
    outputNode,
    update(params: EffectParameters) {
      const nextWiring = iife(() => {
        if (params.reverbLevel > 0) return "reverb";
        if (params.chorusLevel > 0) return "chorus";
        return null;
      });
      if (nextWiring !== currentWiring) {
        internal.cleanupMiddleWiring();
        internal.setupMiddleWiring(nextWiring);
        currentWiring = nextWiring;
      }
      reverb.setLevel(params.reverbLevel);
      chorus.setLevel(params.chorusLevel);
    },
    cleanup() {
      internal.cleanupMiddleWiring();
      saturator.outputNode.disconnect();
    },
  };
}
