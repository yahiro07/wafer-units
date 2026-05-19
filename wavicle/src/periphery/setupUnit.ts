import { asyncRerender } from "alumina";
import { ISynthesizerBase } from "@/base";
import { getHostInterface } from "../../../wus-unit-types";

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
