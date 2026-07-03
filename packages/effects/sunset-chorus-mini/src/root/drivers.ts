import { queryUnitInterface } from "wafer-host/unit-types";
import { store } from "@/editor/store";
import { createEngine } from "./engine";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);
engine.setParameters(store.state.parameters);

export function setupSynchronization() {
  engine.connects();
  const unsubscribeStore = store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  });
  return () => {
    engine.disconnects();
    unsubscribeStore();
  };
}

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["audio"],
      viewSize: [200, 120],
    },
  });
}
