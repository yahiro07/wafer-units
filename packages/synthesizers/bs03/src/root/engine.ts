import { UnitInterface } from "wafer-host/unit-types";
import { defaultSynthParameters } from "@/root/synth-common";
import { createSynthesizer } from "@/root/synthesizer";

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
    setBpm: synth.setBpm,
  };
}
