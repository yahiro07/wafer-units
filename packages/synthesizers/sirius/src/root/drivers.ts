import { createSynthesizerEngine } from "@/engine/synthesizer";
import { automationInput } from "@/root/automation";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSynthesizerEngine(unitInterface);

export function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [720, 440],
      },
      noteInput: {
        noteOn: engine.noteOn,
        noteOff: engine.noteOff,
      },
      automationInput,
      persistence,
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn: (noteNumber) => engine.noteOn(noteNumber),
      noteOff: (noteNumber) => engine.noteOff(noteNumber),
    });
  }
}

export function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
}
