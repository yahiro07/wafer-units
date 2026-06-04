import { asyncRerender } from "alumina";
import { getUnitInterface } from "wus-unit-types";
import { ISynthesizerBase } from "@/base";

export function setupUnit(synth: ISynthesizerBase) {
  const unitInterface = getUnitInterface();
  unitInterface?.declareUnitFeatures({
    type: "instrument",
    categoryHint: "synthesizer",
    outputs: ["audio"],
    inputs: ["note"],
  });
  unitInterface?.primaryInputPort.setHandlers({
    noteInput: {
      noteOn(noteNumber) {
        synth.noteOn(noteNumber);
        asyncRerender();
      },
      noteOff(noteNumber) {
        synth.noteOff(noteNumber);
        asyncRerender();
      },
    },
  });
  unitInterface?.completeSetup();
}
