import { asyncRerender } from "alumina";
import { getHostInterface } from "wus-unit-types";
import { ISynthesizerBase } from "@/base";

export function setupUnit(synth: ISynthesizerBase) {
  const hostInterface = getHostInterface();
  hostInterface?.setupUnitAgent({
    type: "instrument",
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
}
