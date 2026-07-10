import { queryUnitInterface } from "wafer-host/unit-types";
import { appConfig } from "@/common/app-config";
import { createEngine } from "@/root/engine";
import { store } from "@/root/store";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setParameters(store.state.parameters);
  engine.wakeUp();

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["note"],
      viewSize: [480, 300],
    },
    cleanup: engine.teardown,
    noteInput: {
      noteOn(noteNumber, time) {
        engine.noteOn(noteNumber, time ?? 0);
      },
      noteOff(noteNumber, time) {
        engine.noteOff(noteNumber, time ?? 0);
      },
    },
  });
}

export function setupMidiInputForDebug() {
  if (appConfig.isDevelopment) {
    return setupMidiKeyboardInput({
      async noteOn(noteNumber: number) {
        await engine.resumeIfNeed();
        engine.noteOn(noteNumber, 0);
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
  });
}
