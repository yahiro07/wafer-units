import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/editor/automation";
import { persistence } from "@/editor/persistence";
import { store } from "@/editor/store";
import { createEngine } from "./engine";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.connects();
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [200, 120],
      },
      unitCallbacks: {
        setViewActive: store.setViewActive,
      },
      persistence,
      automationInput,
      cleanup: engine.disconnects,
    });
  } else {
    store.setViewActive(true);
  }
}

export function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
}
