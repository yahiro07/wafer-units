import { queryUnitInterface } from "wafer-host/unit-types";
import { store } from "@/root/store";
import { createEngine } from "../core/engine";
import { useEffect } from "preact/hooks";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [871, 156],
    },
    cleanup: engine.cleanup,
  });
}

function setupSynchronization() {
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
