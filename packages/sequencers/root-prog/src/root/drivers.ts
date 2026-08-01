import { queryUnitInterface } from "wafer-host/unit-types";
import { mapKeySpecToKeysName } from "@/root/keys-name-helper";
import { persistence } from "@/root/persistence";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

export function setupUnit() {
  engine.setState(store.state);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [420, 260],
    },
    hostCallbacks: {
      setKey(keySpec) {
        const keyTranspose = keySpec.root + (keySpec.mode === "minor" ? 3 : 0);
        engine.setKeyTranspose(keyTranspose);
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
  });
}
