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
  const latestParameters = parameters;
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
      if (spec.osc1) {
        osc1.updateParameters({ ...spec.osc1 });
        Object.assign(latestParameters.osc1, spec.osc1);
      }
      if (spec.osc2) {
        osc2.updateParameters({ ...spec.osc2 });
        Object.assign(latestParameters.osc2, spec.osc2);
      }
      if (spec.osc3) {
        osc3.updateParameters({ ...spec.osc3 });
        Object.assign(latestParameters.osc3, spec.osc3);
      }
      if (spec.reverb) {
        reverb.apply({
          decay: spec.reverb.time,
          damp: spec.reverb.tone,
          mix: spec.reverb.mix,
        });
        Object.assign(latestParameters.reverb, spec.reverb);
      }
      if (spec.eq) {
        titlingEq.update({
          prFreq: spec.eq.freq ?? latestParameters.eq.freq,
          prTilt: spec.eq.tilt ?? latestParameters.eq.tilt,
        });
        Object.assign(latestParameters.eq, spec.eq);
      }
    },
    noteOn(noteNumber: number) {
      osc1.noteOn(noteNumber, latestParameters.osc1);
      osc2.noteOn(noteNumber, latestParameters.osc2);
      osc3.noteOn(noteNumber, latestParameters.osc3);
    },
    noteOff(noteNumber: number) {
      osc1.noteOff(noteNumber);
      osc2.noteOff(noteNumber);
      osc3.noteOff(noteNumber);
    },
    cleanup() {
      disconnects();
    },
  };
}
