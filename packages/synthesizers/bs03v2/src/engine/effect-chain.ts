import { createDensityShaper } from "@/engine/density-shaper";
import { SynthesisBus } from "@/engine/engine-defs";
import { createOutputSaturator } from "@/engine/output-saturator";
import { connectNodes } from "@/engine/webaudio-helpers";
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
  const voicesGain = ac.createGain();
  const densityShaper = createDensityShaper(ac);
  const patchGain = ac.createGain();
  const saturator = createOutputSaturator(ac);
  const outputNode = ac.createGain();

  const disconnects = connectNodes(
    inputNode,
    densityShaper,
    voicesGain,
    patchGain,
    saturator,
    outputNode,
  );

  voicesGain.gain.value = 0.7;
  return {
    inputNode,
    outputNode,
    update() {
      const pr = bus.parameters;
      densityShaper.update(pr.density);
      patchGain.gain.value = mapKnobCurveCenterUnity(pr.patchVolume);
      saturator.update(pr._saturation);
    },
    cleanup() {
      disconnects();
    },
  };
}
