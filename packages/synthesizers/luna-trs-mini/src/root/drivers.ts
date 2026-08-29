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
  // let latestParameters: Partial<SynthParameters> = {};
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      // const changedAttrs: Partial<SynthParameters> = {};
      // for (const _key in parameters) {
      //   const key = _key as keyof SynthParameters;
      //   if (parameters[key] !== latestParameters[key]) {
      //     changedAttrs[key] = parameters[key] as any;
      //     latestParameters[key] = parameters[key] as any;
      //   }
      // }
      // engine.affectParameters(changedAttrs);
      engine.affectParameters(parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
