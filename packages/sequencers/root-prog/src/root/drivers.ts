import { queryUnitInterface } from "wafer-host/unit-types";
import { mapKeySpecToKeysName } from "@/root/keys-name-helper";
import { persistence } from "@/root/persistence";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [775, 402],
    },
    hostCallbacks: {
      setKey(keySpec) {
        engine.setKeyTranspose(keySpec.relativeKeyTranspose);
        const keysName = mapKeySpecToKeysName(keySpec);
        store.setKeysName(keysName);
      },
    },
    clockHandlers: {
      start() {
        engine.clockHandlers.start?.();
      },
      stop() {
        engine.clockHandlers.stop?.();
        store.setPlayStepIndex(-1);
      },
      processStep(stepIndex, time, unitDuration) {
        engine.clockHandlers.processStep?.(stepIndex, time, unitDuration);
        const totalSteps = store.state.loopBars * 16;
        store.setPlayStepIndex(stepIndex % totalSteps);
      },
    },
    persistence,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ loopBars, notes }) => {
    if (loopBars !== undefined) {
      engine.setState({ loopBars });
    }
    if (notes !== undefined) {
      engine.setState({ notes });
    }
  }, true);
}
