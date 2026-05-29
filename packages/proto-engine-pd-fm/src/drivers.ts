import { onCleanup } from "solid-js";
import { uiActions } from "@/actions";
import { hostInterface } from "@/audio/engine";
import { persistence } from "@/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

export function setupDrivers() {
  if (hostInterface) {
    hostInterface.setupUnitAgent({
      type: "instrument",
      categoryHint: "synthesizer",
      noteInput: {
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
      },
      persistence,
    });
    return;
  }

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
