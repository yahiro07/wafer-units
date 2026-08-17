import { queryUnitInterface } from "wafer-host/unit-types";

import { createSequencer, ISequencerListener } from "@/root/sequencer";
import { store } from "@/root/store";
import { pickObjectMembers } from "@/utils/helpers";

const unitInterface = queryUnitInterface("wafer-v01");
const sequencer = createSequencer(unitInterface);

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [420, 260],
    },
    hostCallbacks: {
      setKey(keySpec) {
        sequencer.setKeyTranspose(keySpec.keyTranspose);
      },
    },
    clockHandlers: sequencer.clockHandlers,
    noteInput: sequencer.noteInput,
    // persistence,
  });
}

export function setupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const editStateAttrs = pickObjectMembers(
      attrs,
      {
        octaveShift: 1,
        stepDuty: 1,
        chordEnabled: 1,
        chordToneFlags: 1,
        gaterEnabled: 1,
        patternLength: 1,
        stepNotes: 1,
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
