import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { createSynthesizerEngine } from "@/engine/synthesizer";
import { createAutomationInput } from "@/root/automation";

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();
const destinationNode =
  unitInterface?.audioOutputNode ?? audioContext.destination;

const engine = createSynthesizerEngine(destinationNode);

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
      automationInput: createAutomationInput(audioContext),
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
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.affectParameters(parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
