import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setup();
  engine.setParameters(store.state.parameters);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["audio", "automation"],
      viewSize: [320, 210],
    },
    hostCallbacks: {
      setBpm: engine.setBpm,
    },
    persistence,
    automationInput,
    cleanup: () => engine.teardown(),
  });
}

export function setupStoreSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  });
}
