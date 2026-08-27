import { automationInput } from "@/root/.local/automation";
import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { createSynthesizerEngine } from "@/engine/synthesizer";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSynthesizerEngine(unitInterface);

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [1048, 538],
      },
      noteInput: {
        noteOn: engine.noteOn,
        noteOff: engine.noteOff,
      },
      automationInput,
      // persistence,
      cleanup: engine.cleanup,
      persistence: {
        emitState() {
          return store.state;
        },
        applyState(state) {
          store.assign(state);
        },
      },
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn: (noteNumber) => engine.noteOn(noteNumber),
      noteOff: (noteNumber) => engine.noteOff(noteNumber),
    });
  }
}

function setupSynchronization() {
  return store.subscribe(({ synthParameters }) => {
    if (synthParameters) {
      engine.setParameters(synthParameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
