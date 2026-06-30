import { queryUnitInterface } from "wafer-host/unit-types";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);
engine.setParameters(store.state.parameters);

export function setupSynchronization() {
  engine.setup();
  const unsubscribeStore = store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  });
  return () => {
    engine.teardown();
    unsubscribeStore();
  };
}

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["audio"],
    },
    hostCallbacks: {
      setBpm: engine.setBpm,
    },
    persistence,
  });
}
