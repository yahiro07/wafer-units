import { onCleanup } from "solid-js";
import { uiActions } from "@/actions";
import { synthEngine, unitInterface } from "@/audio/engine";
import { persistence } from "@/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

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
      async noteOn(noteNumber) {
        await synthEngine.resumeIfNeeded();
        uiActions.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        uiActions.noteOff(noteNumber);
      },
    });
    onCleanup(closeMidiIn);
  }
}
