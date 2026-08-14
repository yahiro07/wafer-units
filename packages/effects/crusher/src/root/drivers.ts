import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/editor/automation";
import { persistence } from "@/editor/persistence";
import { store } from "@/editor/store";
import { createEngine } from "./engine";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createEngine(unitInterface);

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [320, 180],
    },
    persistence: persistence,
    automationInput: automationInput,
  });
}

export function setupSynchronization() {
  engine.connects();
  const unsubscribeStore = store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  }, true);
  return () => {
    engine.disconnects();
    unsubscribeStore();
  };
}
