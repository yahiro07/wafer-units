import { defaultSynthParameters } from "@/core/definitions";
import { createSynthesizer } from "@/core/synthesizer";
import { UnitInterface } from "wafer-host/unit-types";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const synth = createSynthesizer(audioContext, defaultSynthParameters);
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    setParameters: synth.setParameters,
    connects() {
      synth.outputNode.connect(destinationNode);
    },
    disconnects() {
      synth.outputNode.disconnect(destinationNode);
      synth.cleanup();
    },
    noteOn: synth.noteOn,
    noteOff: synth.noteOff,
  };
}
