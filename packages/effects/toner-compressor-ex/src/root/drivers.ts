import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import {
  analyzerEngine,
  effectEngine,
  unitInterface,
} from "@/core/engine-instances";

function setupUnit() {
  analyzerEngine.setup();
  analyzerEngine.setBarLength(store.state.barLength);

  function setViewActive(active: boolean) {
    store.setViewActive(active);
    analyzerEngine.setDrawingActive(active);
  }

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [832, 448],
      },
      hostCallbacks: {
        setBpm(bpm: number) {
          store.setHostBpm(bpm);
          analyzerEngine.setBpm(bpm);
        },
      },
      clockHandlers: {
        start: analyzerEngine.hostStarted,
      },
      unitCallbacks: {
        setViewActive,
      },
      cleanup() {
        analyzerEngine.cleanup();
        effectEngine.cleanup();
      },
    });
    if (store.state.viewActive) {
      setViewActive(true);
    }
  } else {
    setViewActive(true);
  }
}

function setupSynchronization() {
  return store.subscribe(({ parameters, effectEnabled, sideChain }) => {
    if (parameters) {
      effectEngine.setParameters(parameters);
    }
    if (effectEnabled !== undefined) {
      effectEngine.setEnabled(effectEnabled);
    }
    if (sideChain !== undefined) {
      effectEngine.setSideChain(sideChain);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
