import { queryUnitInterface } from "wafer-host/unit-types";

import { store } from "@/root/store";
import { pickObjectMembers } from "@/utils/helpers";
import { useEffect } from "preact/hooks";
import { createSynthesizer } from "@/engine/synthesizer";
import { ISequencerListener } from "@/defs/interfaces";
import { createSequencer } from "@/engine/sequencer";
import { mapKeySpecToKeysName } from "@/utils/key-name-helper";

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();
const synthesizer =
  (!unitInterface && createSynthesizer(unitInterface, audioContext)) ||
  undefined;
const sequencer = createSequencer(unitInterface, synthesizer);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [828, 492],
    },
    hostCallbacks: {
      setKey(keySpec) {
        store.setKeyLabel(mapKeySpecToKeysName(keySpec));
        store.setKeyTranspose(keySpec.keyTranspose);
      },
    },
    clockHandlers: {
      start: sequencer.start,
      processStep: sequencer.processStep,
      stop: sequencer.stop,
    },
  });
}

function setupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const editStateAttrs = pickObjectMembers(
      attrs,
      {
        baseStep: 1,
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

    const { tonePreviewPitchIndex } = attrs;
    if (tonePreviewPitchIndex !== undefined) {
      sequencer.setPreviewTone(tonePreviewPitchIndex);
    }
  }, true);

  const sequencerListener: ISequencerListener = {
    onPlayStepPositionChanged(stepIndex) {
      if (stepIndex !== -1) {
        store.setPlayStepIndex(stepIndex % 16);
        if (store.state.patternLength >= 32) {
          const ptLen = store.state.patternLength;
          const page = Math.floor((stepIndex % ptLen) / 16);
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
