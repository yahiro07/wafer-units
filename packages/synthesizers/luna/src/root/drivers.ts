import { automationInput } from "@/root/automation";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { createSynthesizerEngine } from "@/engine/synthsizer";
import { SynthParameters } from "@/defs/definitions";

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
        noteOn(noteNumber, time) {
          engine.noteOn(noteNumber, time);
        },
        noteOff(noteNumber, time) {
          engine.noteOff(noteNumber, time);
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
  let latestParameters: Partial<SynthParameters> = {};
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      const changedAttrs: Partial<SynthParameters> = {};
      for (const _key in parameters) {
        const key = _key as keyof SynthParameters;
        if (parameters[key] !== latestParameters[key]) {
          changedAttrs[key] = parameters[key] as any;
          latestParameters[key] = parameters[key] as any;
        }
      }
      engine.affectParameters(changedAttrs);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
