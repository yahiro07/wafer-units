import { queryUnitInterface } from "wafer-host/unit-types";

import { automationInput } from "@/root/automation";
import { persistence } from "@/root/persistence";
import { createSequencer, ISequencerListener } from "@/root/sequencer";
import { store } from "@/root/store";
import { pickObjectMembers } from "@/utils/helpers";
import { useEffect } from "preact/hooks";

const unitInterface = queryUnitInterface("wafer-v01");
const sequencer = createSequencer(unitInterface);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [828, 492],
    },
    hostCallbacks: {
      setKey: sequencer.setKey,
    },
    clockHandlers: sequencer.clockHandlers,
    noteInput: sequencer.noteInput,
    persistence,
    automationInput,
  });
}

function setupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const editStateAttrs = pickObjectMembers(
      attrs,
      {
        octaveShift: 1,
        stepDuty: 1,
        shiftEnabled: 1,
        patternLength: 1,
        notes: 1,
      },
      { ignoreUndefined: true },
    );
    if (Object.keys(editStateAttrs).length > 0) {
      sequencer.setState(editStateAttrs);
    }
  }, true);

  const sequencerListener: ISequencerListener = {
    onPlayStepPositionChanged(stepIndex) {
      if (stepIndex !== -1) {
        store.setPlayStepIndex(stepIndex % 16);
        if (store.state.patternLength >= 32) {
          const page = Math.floor((stepIndex % 64) / 16);
          if (store.state.currentPageIndex !== page) {
            store.setCurrentPageIndex(page);
          }
        }
      } else {
        store.setPlayStepIndex(-1);
        store.setCurrentPageIndex(0);
      }
    },
  };
  sequencer.setListener(sequencerListener);

  return () => {
    unsubscribeStore();
    sequencer.setListener(null);
  };
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
