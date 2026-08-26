import { createCompressorUnit } from "@/engine/compressor-unit";
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
  const compressor = createCompressorUnit(ac);
  const patchGain = ac.createGain();
  const saturator = createOutputSaturator(ac);
  const outputNode = ac.createGain();
  inputNode.connect(compressor.inputNode);
  compressor.outputNode.connect(patchGain);
  patchGain.connect(saturator.inputNode);
  saturator.outputNode.connect(outputNode);

  inputNode.gain.value = 0.3; //voice mix gain
  return {
    inputNode,
    outputNode,
    update() {
      const pr = bus.parameters;
      patchGain.gain.value = mapKnobCurveCenterUnity(pr.patchVolume);
      compressor.update(pr.press);
      saturator.update(pr._saturation);
    },
    cleanup() {
      inputNode.disconnect();
      patchGain.disconnect();
      compressor.cleanup();
      saturator.cleanup();
    },
  };
}
