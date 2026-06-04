import { onCleanup } from "solid-js";
import { uiActions } from "@/actions";
import { unitInterface } from "@/audio/engine";
import { persistence } from "@/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

export function setupDrivers() {
  if (unitInterface) {
    unitInterface.declareUnitFeatures({
      type: "instrument",
      categoryHint: "synthesizer",
      outputs: ["audio"],
      inputs: ["note", "state"],
    });
    unitInterface.primaryInputPort.setHandlers({
      noteInput: {
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
      },
      stateInput: persistence,
    });
    unitInterface.completeSetup();
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
