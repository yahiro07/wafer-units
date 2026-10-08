import { createStore } from "solid-js/store";
import { queryUnitInterface } from "wafer-host/unit-types";
import { createAnalyzerEngine } from "@/analyzer-engine";

function createAppModel() {
  const unitInterface = queryUnitInterface("wafer-v01");

  const [appState, setAppState] = createStore<{
    fftData: Float32Array | null;
    viewActive: boolean;
  }>({
    fftData: null,
    viewActive: false,
  });

  const coreActions = {
    setFftData(fftData: Float32Array) {
      setAppState("fftData", fftData);
    },
  };

  const analyzerEngine = createAnalyzerEngine(
    unitInterface,
    coreActions.setFftData,
  );

  const actions = {
    setViewActive(active: boolean) {
      setAppState("viewActive", active);
      if (active) {
        analyzerEngine.start();
      } else {
        analyzerEngine.stop();
      }
    },
  };

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
      },
      unitCallbacks: {
        setViewActive: actions.setViewActive,
      },
      cleanup() {
        analyzerEngine.cleanup();
      },
    });
  } else {
    setAppState("viewActive", true);
  }

  return {
    getters: {
      fftData: () => appState.fftData,
      viewActive: () => appState.viewActive,
    },
    setSize(width: number, height: number) {
      unitInterface?.setViewSize({ width, height });
    },
  };
}
export const appModel = createAppModel();
