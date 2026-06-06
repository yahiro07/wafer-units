import { setupMidiKeyboardInput } from "mofus/mx-audio";
import { onCleanup } from "solid-js";
import { uiActions } from "@/actions";
import { persistence } from "@/persistence";
import { unitInterface } from "@/synthesis";

export function setupDrivers() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        categoryHint: "synthesizer",
        outputs: ["audio"],
        inputs: ["note", "state"],
      },
      primaryInputPortHandlers: {
        noteInput: {
          noteOn: uiActions.noteOn,
          noteOff: uiActions.noteOff,
        },
        stateInput: persistence,
      },
    });
  } else {
    const closeMidiIn = setupMidiKeyboardInput({
      noteOn(noteNumber) {
        uiActions.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        uiActions.noteOff(noteNumber);
      },
    });
    onCleanup(closeMidiIn);
  }
}
