import { queryUnitInterface } from "wafer-host/unit-types";
import { persistence } from "@/editor/persistence";
import { store } from "@/editor/store";
import { createEngine } from "./engine";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setParameters(store.state.parameters);
  engine.connects();
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [200, 120],
    },
    persistence,
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
