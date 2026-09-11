import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { engine, unitInterface } from "@/root/engine-instance";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [871, 156],
      },
      noteInput: {
        noteOn: engine.noteOn,
        noteOff: engine.noteOff,
      },
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn(noteNumber) {
        engine.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        engine.noteOff(noteNumber);
      },
    });
  }
}

function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
