import { SynthesisBus } from "@/engine/engine-defs";
import { mapKnobCurveCenterUnity } from "@/utils/volume-curve";

type EffectChain = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(): void;
  cleanup(): void;
};

export function createEffectChain(bus: SynthesisBus): EffectChain {
  const ac = bus.audioContext;
  const inputNode = ac.createGain();
  const gainNode = ac.createGain();
  const outputNode = ac.createGain();
  inputNode.connect(gainNode).connect(outputNode);
  return {
    inputNode,
    outputNode,
    update() {
      gainNode.gain.value = mapKnobCurveCenterUnity(bus.parameters.patchVolume);
    },
    cleanup() {
      inputNode.disconnect();
    },
  };
}
