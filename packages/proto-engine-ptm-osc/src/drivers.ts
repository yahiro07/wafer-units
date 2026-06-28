import { setupMidiKeyboardInput } from "mofus/mx-audio";
import { onCleanup } from "solid-js";
import { synthEngine, uiActions } from "@/actions";
import { createAutomationInput } from "@/automation-input";
import { persistence } from "@/persistence";
import { unitInterface } from "@/synthesis";

export function setupDrivers() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        categoryHint: "synthesizer",
        outputs: ["audio"],
        inputs: ["note", "automation"],
      },
      noteInput: {
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
      },
      automationInput: createAutomationInput(),
      persistence,
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
