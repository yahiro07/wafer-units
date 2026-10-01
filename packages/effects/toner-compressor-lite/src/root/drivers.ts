import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { effectEngine, unitInterface } from "@/core/engine-instances";
import { persistenceImpl } from "@/root/persistence";

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [356, 226],
      },
      unitCallbacks: {
        setViewActive: store.setViewActive,
      },
      persistence: persistenceImpl,
      cleanup: effectEngine.cleanup,
    });
  } else {
    store.setViewActive(true);
  }
}

function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      effectEngine.setParameters(parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
