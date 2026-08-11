import { createSequencer } from "@/root/sequencer";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import {
  filterObjectValuesNonUndefined,
  pickObjectMembers,
} from "@/utils/helpers";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const sequencer = createSequencer(unitInterface);

sequencer.setSceneEditStateAttrs(
  pickObjectMembers(store.state, {
    patternKey: 1,
    loopBars: 1,
    rollPartItem: 1,
    cymbalPartItem: 1,
    volumeSlopeUp: 1,
    loopEnabled: 1,
  }),
);

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
    cleanup: sequencer.cleanup,
  });
}

function useSetupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const {
      patternKey,
      loopBars,
      rollPartItem,
      cymbalPartItem,
      volumeSlopeUp,
      loopEnabled,
      oneShotTriggered,
    } = attrs;
    const editStateAttrs = filterObjectValuesNonUndefined({
      patternKey,
      loopBars,
      rollPartItem,
      cymbalPartItem,
      volumeSlopeUp,
      loopEnabled,
    });
    if (Object.keys(editStateAttrs).length > 0) {
      sequencer.setSceneEditStateAttrs(editStateAttrs);
    }
    if (oneShotTriggered !== undefined) {
      sequencer.setOneShotTriggered(oneShotTriggered);
    }
  });

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
