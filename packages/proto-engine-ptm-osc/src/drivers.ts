import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { onCleanup } from "solid-js";
import { getUnitInterface } from "wus-unit-types";
import { uiActions } from "@/actions";
import { persistence } from "@/persistence";

export function setupDrivers() {
  const unitInterface = getUnitInterface();
  if (unitInterface) {
    unitInterface.completeSetupWithAttributes({
      unitFeatures: {
        type: "instrument",
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
