import { fixedParameters } from "@/defs/definitions";
import { createDensityShaper2 } from "@/engine/density-shaper-2";
import { SynthesisBus } from "@/engine/engine-defs";
import { createOutputSaturator } from "@/engine/output-saturator";
import { createReverb } from "@/engine/reverb";
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
  // const densityShaper = createDensityShaper(ac);
  const densityShaper = createDensityShaper2(ac);
  const patchGain = ac.createGain();
  const saturator = createOutputSaturator(ac);
  const reverb = createReverb(ac);
  const outputNode = ac.createGain();

  const disconnects = connectNodes(
    inputNode,
    densityShaper,
    voicesGain,
    patchGain,
    saturator,
    reverb,
    outputNode,
  );

  voicesGain.gain.value = 0.7;
  return {
    inputNode,
    outputNode,
    update() {
      const pr = bus.parameters;
      densityShaper.update(pr.density);
      const patchVolume = mapKnobCurveCenterUnity(pr.patchVolume);
      if (patchGain.gain.value !== patchVolume) {
        patchGain.gain.linearRampToValueAtTime(
          patchVolume,
          ac.currentTime + 0.03,
        );
      }
      saturator.update(fixedParameters.saturation);
      reverb.apply(
        { decay: pr.reverbTime, mix: pr.reverbMix, damp: pr.reverbTone },
        ac.currentTime,
      );
    },
    cleanup() {
      disconnects();
    },
  };
}
