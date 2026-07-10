import { UnitInterface } from "wafer-host/unit-types";
import { defaultSynthParameters } from "@/root/synth-common";
import { createSynthesizer } from "@/root/synthesizer";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const synth = createSynthesizer(audioContext, defaultSynthParameters);
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  return {
    async resumeIfNeed() {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    },
    setParameters: synth.setParameters,
    wakeUp() {
      synth.wakeUp();
      synth.outputNode.connect(destinationNode);
    },
    teardown() {
      synth.outputNode.disconnect(destinationNode);
      synth.teardown();
    },
    noteOn: synth.noteOn,
    noteOff: synth.noteOff,
  };
}
