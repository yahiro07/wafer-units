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
    //development
    setAppState("viewActive", true);
    const fftData = new Float32Array([
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.8, 0.6, 0.4, 0.2, 0.1,
      0.15,
    ]);
    coreActions.setFftData(fftData);
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
