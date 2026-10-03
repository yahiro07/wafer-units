import { mapKnobCurveCenterUnity } from "@lib/mu2609/utils/volume-curve";
import { createConnectionKeeper } from "@lib/mu2609/utils/webaudio-helper";
import { SynthesisBus, ParameterEditSpec } from "./definitions";
import { createOutputSaturator } from "./output-saturator";
import { createReverb } from "./reverb";
import { createTiltingEq } from "./tilting-eq";

export function createEffectChain(bus: SynthesisBus) {
  const ac = bus.audioContext;
  const inputNode = ac.createGain();
  const outputNode = ac.createGain();
  const titlingEq = createTiltingEq(ac);
  const saturator = createOutputSaturator(ac);
  saturator.update(1);
  const reverb = createReverb(ac);

  const connectionKeeper = createConnectionKeeper();

  connectionKeeper.connects(inputNode, titlingEq, saturator, outputNode);

  return {
    inputNode,
    outputNode,
    applyParameters(spec: ParameterEditSpec) {
      if (spec.reverb) {
        reverb.apply({
          decay: spec.reverb.time,
          damp: spec.reverb.tone,
          mix: spec.reverb.mix,
        });
        if (spec.reverb.enabled !== undefined) {
          if (spec.reverb.enabled) {
            connectionKeeper.connects(
              inputNode,
              titlingEq,
              saturator,
              reverb,
              outputNode,
            );
          } else {
            connectionKeeper.connects(
              inputNode,
              titlingEq,
              saturator,
              outputNode,
            );
          }
        }
      }
      if (spec.eq) {
        titlingEq.update({
          prFreq: bus.latestParameters.eq.freq,
          prTilt: bus.latestParameters.eq.tilt,
        });
      }
      if (spec.misc) {
        outputNode.gain.value = mapKnobCurveCenterUnity(
          bus.latestParameters.misc.patchVolume,
        );
      }
    },
    cleanup() {
      titlingEq.cleanup();
      saturator.cleanup();
      reverb.cleanup();
      connectionKeeper.cleanup();
    },
  };
}
