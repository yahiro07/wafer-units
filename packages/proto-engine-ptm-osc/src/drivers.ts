import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { onCleanup } from "solid-js";
import { getHostInterface } from "wus-unit-types";
import { uiActions } from "@/actions";

export function setupDrivers() {
  const hostInterface = getHostInterface();
  if (hostInterface) {
    hostInterface.setupUnitAgent({
      type: "instrument",
      categoryHint: "synthesizer",
      noteInput: {
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
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
