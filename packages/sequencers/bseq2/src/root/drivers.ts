import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createEngine(unitInterface);

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [480, 200],
    },
    noteInput: engine.noteInput,
    clockHandlers: {
      start() {
        engine.clockHandlers.start?.();
      },
      processStep(inputStepIndex, time, unitDuration) {
        engine.clockHandlers.processStep?.(inputStepIndex, time, unitDuration);
        const stepIndex = inputStepIndex % 16;
        store.setPlayPos(stepIndex);
      },
      stop() {
        engine.clockHandlers.stop?.();
        store.setPlayPos(-1);
      },
    },
    persistence: persistence,
    automationInput: automationInput,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ octave, duty, patternRange, stepBits }) => {
    if (octave !== undefined) {
      engine.setState({ octave });
    }
    if (duty !== undefined) {
      engine.setState({ duty });
    }
    if (patternRange !== undefined) {
      engine.setState({ patternRange });
    }
    if (stepBits !== undefined) {
      engine.setState({ stepBits });
    }
  }, true);
}
