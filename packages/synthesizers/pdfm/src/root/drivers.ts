import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { createSynthesizerEngine } from "@/logic/synthesizer";
import { automationInput } from "@/root/automation";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSynthesizerEngine(unitInterface);

function setupUnit() {
  engine.setParameters(store.state.parameters);
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [720, 440],
      },
      noteInput: {
        noteOn(noteNumber, time) {
          engine.noteOn(noteNumber, time ?? 0);
        },
        noteOff(noteNumber, time) {
          engine.noteOff(noteNumber, time ?? 0);
        },
      },
      automationInput,
      persistence,
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
  });
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
