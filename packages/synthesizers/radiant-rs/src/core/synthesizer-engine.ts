import type { UnitInterface } from "wafer-host/unit-types";
import { connectNodes } from "@lib/mu2609/utils/webaudio-helper";
import {
  ParameterEditSpec,
  SynthesisBus,
  SynthParameters,
} from "./definitions";
import { createEffectChain } from "./synth-effect-chain";
import { createVoicesStage } from "./synth-voices-stage";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
  parameters: SynthParameters,
) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const bus: SynthesisBus = { audioContext: ac, latestParameters: parameters };

  const voicesStage = createVoicesStage(bus);
  const effectChain = createEffectChain(bus);

  const disconnects = connectNodes(
    voicesStage.outputNode,
    effectChain,
    destinationNode,
  );

  return {
    applyParameters(spec: ParameterEditSpec) {
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        Object.assign(bus.latestParameters[key], spec[key]);
      }
      voicesStage.applyParameters(spec);
      effectChain.applyParameters(spec);
    },
    noteOn(noteNumber: number, time: number) {
      voicesStage.noteOn(noteNumber, time);
    },
    noteOff(noteNumber: number, time: number) {
      voicesStage.noteOff(noteNumber, time);
    },
    cleanup() {
      voicesStage.cleanup();
      effectChain.cleanup();
      disconnects();
    },
  };
}
