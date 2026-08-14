import { automationInput } from "@/root/automation";
import { createSequencer } from "@/root/sequencer";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { filterObjectValuesNonUndefined } from "@/utils/helpers";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const sequencer = createSequencer(unitInterface);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [500, 300],
    },
    clockHandlers: {
      start: sequencer.onHostStart,
      processStep: sequencer.onHostStep,
      stop: sequencer.onHostStop,
    },
    persistence,
    automationInput,
    cleanup: sequencer.cleanup,
  });
}

function useSetupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const {
      patternKey,
      loopBars,
      rollPartItem,
      crashPartItem,
      volumeSlopeUp,
      loopEnabled,
      oneShotTriggered,
    } = attrs;
    const editStateAttrs = filterObjectValuesNonUndefined({
      patternKey,
      loopBars,
      rollPartItem,
      crashPartItem,
      volumeSlopeUp,
      loopEnabled,
    });
    if (Object.keys(editStateAttrs).length > 0) {
      sequencer.setSceneEditStateAttrs(editStateAttrs);
    }
    if (oneShotTriggered !== undefined) {
      sequencer.setOneShotTriggered(oneShotTriggered);
    }
  }, true);

  const unsubscribeHitCallback = sequencer.subscribeEvents((ev) => {
    if (ev.type === "sampleHit") {
      const { partKey } = ev;
      store.setPartHitCounts((prev) => ({
        ...prev,
        [partKey]: (prev[partKey] ?? 0) + 1,
      }));
    } else if (ev.type === "oneShotCompleted") {
      store.setOneShotTriggered(false);
    }
  });

  return () => {
    unsubscribeStore();
    unsubscribeHitCallback();
  };
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(useSetupSynchronization, []);
}
