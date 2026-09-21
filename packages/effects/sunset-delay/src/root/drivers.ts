import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterfaceForModule("wafer-v01", import.meta.url);
const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setup();
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [320, 210],
      },
      hostCallbacks: {
        setBpm: engine.setBpm,
      },
      unitCallbacks: {
        setViewActive: store.setViewActive,
      },
      persistence,
      automationInput,
      cleanup: () => engine.teardown(),
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
