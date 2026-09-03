import { SynthParameters } from "@/defs/definitions";
import { allPresets } from "@/defs/presets";
import { createSynthesizerEngine } from "@/engine/synthesizer";
import { automationInput } from "@/root/automation";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { filterChangedFields } from "@/utils/helpers";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSynthesizerEngine(unitInterface);

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [400, 280],
      },
      noteInput: {
        noteOn: engine.noteOn,
        noteOff: engine.noteOff,
      },
      presetProvider: {
        getPresetNames() {
          return Object.keys(allPresets);
        },
        applyPreset(presetName) {
          const preset = allPresets[presetName];
          store.patchParameters(preset);
        },
      },
      automationInput,
      persistence,
      cleanup: engine.cleanup,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn(noteNumber: number) {
        engine.noteOn(noteNumber);
      },
      noteOff(noteNumber: number) {
        engine.noteOff(noteNumber);
      },
    });
  }
}

function setupSynchronization() {
  let latestParameters: Partial<SynthParameters> = {};
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      const changedAttrs = filterChangedFields<SynthParameters>(
        latestParameters,
        parameters,
      );
      if (Object.keys(changedAttrs).length > 0) {
        engine.applyParameters(changedAttrs);
        Object.assign(latestParameters, parameters);
      }
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
