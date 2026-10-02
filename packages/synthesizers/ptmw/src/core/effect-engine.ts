import type { UnitInterface } from "wafer-host/unit-types";
import { createTiltingEq } from "./tilting-eq";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import { createReverb } from "./reverb";
import { createOscillatorUnit } from "./oscillator-unit";
import { ParameterEditSpec, SynthParameters } from "./definitions";

export function createEffectEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const oscMixNode = ac.createGain();

  const osc1 = createOscillatorUnit(ac, oscMixNode);
  const osc2 = createOscillatorUnit(ac, oscMixNode);
  const osc3 = createOscillatorUnit(ac, oscMixNode);

  const titlingEq = createTiltingEq(ac);
  const reverb = createReverb(ac);

  const disconnects = connectNodes(
    oscMixNode,
    titlingEq,
    reverb,
    destinationNode,
  );

  return {
    osc1,
    osc2,
    osc3,
    titlingEq,
    reverb,
    applyParameters(spec: ParameterEditSpec) {
      if (spec.reverb) {
        reverb.apply({
          decay: spec.reverb.time,
          damp: spec.reverb.tone,
          mix: spec.reverb.mix,
        });
        Object.assign(parameters.reverb, spec.reverb);
      }
      if (spec.eq) {
        titlingEq.update({
          prFreq: spec.eq.freq ?? parameters.eq.freq,
          prTilt: spec.eq.tilt ?? parameters.eq.tilt,
        });
        Object.assign(parameters.eq, spec.eq);
      }
    },
    // noteOn(noteNumber: number) {
    //   osc1.noteOn(noteNumber);
    //   osc2.noteOn(noteNumber);
    //   osc3.noteOn(noteNumber);
    // },
    // noteOff(noteNumber: number) {
    //   osc1.noteOff(noteNumber);
    //   osc2.noteOff(noteNumber);
    //   osc3.noteOff(noteNumber);
    // },
    cleanup() {
      disconnects();
    },
  };
}
