import { SynthParameters } from "@/core/definitions";
import { createSynthesizerEngine } from "@/core/synthesizer";
import { actions } from "@/root/actions";
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
            { id: "oscWave", steps: 3 },
            { id: "oscDetune" },
            { id: "oscSub" },
            { id: "oscDrift" },
            { id: "fxChorus" },
            { id: "fxReverb" },
            { id: "filterCutoff" },
            { id: "filterPeak" },
            { id: "filterDecay" },
            { id: "ampDecay" },
            { id: "ampRelease" },
            { id: "patchVolume" },
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
      cleanup: engine.cleanup,
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

export function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
}
