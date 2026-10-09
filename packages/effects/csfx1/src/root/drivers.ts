import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.connects();
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [300, 160],
      },
      unitCallbacks: {
        setViewActive: store.setViewActive,
      },
      persistence: persistence,
      automationInput: automationInput,
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
