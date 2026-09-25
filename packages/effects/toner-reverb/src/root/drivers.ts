import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { createEffectEngine } from "@/core/effect-engine";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const effectEngine = createEffectEngine(unitInterface);

function setupUnit() {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [300, 100],
      },
      unitCallbacks: {
        setViewActive: store.setViewActive,
      },
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
