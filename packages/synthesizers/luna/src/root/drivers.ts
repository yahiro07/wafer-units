import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { createSynthesizerEngine } from "@/engine/synthsizer";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSynthesizerEngine(unitInterface);

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [720, 440],
      },
      noteInput: {
        noteOn(noteNumber, time) {
          engine.noteOn(noteNumber, time);
        },
        noteOff(noteNumber, time) {
          engine.noteOff(noteNumber, time);
        },
      },
      // automationInput,
      // persistence,
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn(noteNumber: number) {
        engine.noteOn(noteNumber, 0);
      },
      noteOff(noteNumber: number) {
        engine.noteOff(noteNumber, 0);
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
