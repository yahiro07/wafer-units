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
      viewSize: [720, 360],
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
    onDisplayStepIndexChanged(stepIndex) {
      store.setPlayStepIndex(stepIndex);
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
