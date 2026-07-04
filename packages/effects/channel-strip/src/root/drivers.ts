import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");

const engine = createEngine(unitInterface);
engine.setParameters(store.state.parameters);

let cleanupFn: (() => void) | undefined;

export function setupSynchronization() {
  engine.setup();
  const unsubscribeStore = store.subscribe(({ parameters }) => {
    if (parameters) {
      engine.setParameters(parameters);
    }
  });
  cleanupFn = () => {
    engine.teardown();
    unsubscribeStore();
    cleanupFn = undefined;
  };
  return cleanupFn;
}

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["audio", "automation"],
      viewSize: [300, 160],
    },
    persistence: persistence,
    automationInput: automationInput,
    cleanup: () => cleanupFn?.(),
  });
}
