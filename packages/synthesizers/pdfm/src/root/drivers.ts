import { SynthParameters } from "@/core/definitions";
import { createEngine } from "@/core/engine";
import { actions } from "@/root/actions";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { useEffect } from "preact/hooks";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createEngine(unitInterface);

function setupUnit() {
  engine.setParameters(store.state.parameters);
  engine.connects();

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "instrument",
        viewSize: [720, 440],
      },
      noteInput: {
        noteOn(noteNumber, time) {
          engine.noteOn(noteNumber, time ?? 0, 1);
        },
        noteOff(noteNumber, time) {
          engine.noteOff(noteNumber, time ?? 0);
        },
      },
      automationInput: {
        getParameterSpecs() {
          return [
            { id: "oscWave", step: 3 },
            { id: "oscDetune" },
            { id: "oscSub" },
            { id: "oscDrift" },
            { id: "fxChorus" },
            { id: "fxReverb" },
            { id: "filterCutoff" },
            { id: "filterPeak" },
            { id: "filterEnvMod" },
            { id: "ampDecay" },
            { id: "ampRelease" },
            { id: "masterVolume" },
          ];
        },
        getParameter(id) {
          if (id === "oscWave") {
            return store.state.parameters.oscWave / 2;
          } else {
            return store.state.parameters[id as keyof SynthParameters];
          }
        },
        setParameter(id, value) {
          if (id === "oscWave") {
            actions.setParameter("oscWave", value * 2);
          } else {
            actions.setParameter(id as keyof SynthParameters, value);
          }
        },
      },
      persistence,
      cleanup: engine.disconnects,
    });
  } else {
    return setupMidiKeyboardInput({
      noteOn(noteNumber: number) {
        engine.noteOn(noteNumber, 0, 1);
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
