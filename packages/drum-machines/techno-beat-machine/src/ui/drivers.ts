import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";
import { allPartKeys } from "@/model/defs";
import { createSequencerEngine } from "@/model/sequencer-engine";
import { automationInput } from "@/ui/automation";
import { allSampleKeys } from "@/ui/common/ui-data";
import { persistence } from "@/ui/persistence";
import { store } from "@/ui/store/store";

const unitInterface = queryUnitInterface("wafer-v01");
const sequencer = createSequencerEngine(unitInterface);

sequencer.registerPartEntries(allPartKeys);
sequencer.registerSampleEntries(allSampleKeys);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [900, 500],
    },
    hostCallbacks: {
      setBpm: sequencer.setBpm,
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
    const { localPlaying, partItems, masterVolume, currentPartKey, soloMode } =
      attrs;
    if (localPlaying !== undefined) {
      if (localPlaying) {
        sequencer.play();
      } else {
        sequencer.stop();
      }
    }
    if (partItems !== undefined) {
      sequencer.setPartItems(partItems);
    }
    if (masterVolume !== undefined) {
      sequencer.setMasterVolume(masterVolume);
    }
    if (currentPartKey !== undefined || soloMode !== undefined) {
      const st = store.state;
      sequencer.setSoloPartKey(st.soloMode ? st.currentPartKey : null);
    }
  }, true);

  const unsubscribeHitCallback = sequencer.setHitCallback((partKey) => {
    store.setPartHitCounts((prev) => ({
      ...prev,
      [partKey]: (prev[partKey] ?? 0) + 1,
    }));
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
