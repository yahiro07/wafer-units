import { queryUnitInterface } from "wafer-host/unit-types";
import { createEngine } from "@/root/engine";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setParameters(store.state.parameters);
  engine.connects();

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["note"],
      viewSize: [300, 160],
    },
    noteInput: {
      noteOn(noteNumber, time) {
        engine.noteOn(noteNumber, time ?? 0);
      },
      noteOff(noteNumber, time) {
        engine.noteOff(noteNumber, time ?? 0);
      },
    },
    hostCallbacks: {
      setBpm: engine.setBpm,
    },
    cleanup: engine.disconnects,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  });
}
