import { SynthesisBus } from "@/engine/engine-defs";
import { createOutputSaturator } from "@/engine/output-saturator";
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
  const saturationNode = createOutputSaturator(ac);
  const outputNode = ac.createGain();
  inputNode.connect(gainNode);
  gainNode.connect(saturationNode.inputNode);
  saturationNode.outputNode.connect(outputNode);
  return {
    inputNode,
    outputNode,
    update() {
      gainNode.gain.value = mapKnobCurveCenterUnity(bus.parameters.patchVolume);
      saturationNode.update(bus.parameters._saturation);
    },
    cleanup() {
      inputNode.disconnect();
    },
  };
}
