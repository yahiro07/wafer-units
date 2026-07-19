import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);

export function setupUnit() {
  engine.setParameters(store.state.parameters);
  engine.connects();
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [300, 160],
    },
    persistence: persistence,
    automationInput: automationInput,
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
