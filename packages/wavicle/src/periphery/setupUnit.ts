import { asyncRerender } from "alumina";
import { ISynthesizerBase } from "@/base";
import { unitInterface } from "@/synthLib/unitInterface";

export function setupUnit(synth: ISynthesizerBase) {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      categoryHint: "synthesizer",
      outputs: ["audio"],
      inputs: ["note"],
    },
    primaryInputPortHandlers: {
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
    },
  });
}
