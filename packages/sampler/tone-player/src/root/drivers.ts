import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { engine, unitInterface } from "@/root/engine-instance";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";

function setupUnit() {
  const handleNoteOn = (noteNumber: number) => {
    const index = noteNumber % 12;
    engine.trigger(index);
  };

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [800, 500],
      },
      noteInput: {
        noteOn: handleNoteOn,
        noteOff: () => {},
      },
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn: handleNoteOn,
    });
  }
}

function setupSynchronization() {
  return store.subscribe(({ slots, commonParameters }) => {
    if (slots) {
      engine.setSlots(slots);
    }
    if (commonParameters) {
      engine.setCommonParameters(commonParameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
