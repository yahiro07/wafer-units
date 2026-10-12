import { createStore } from "solid-js/store";
import { queryUnitInterface } from "wafer-host/unit-types";
import {
  createEffectEngine,
  defaultEffectParameters,
  EffectParameters,
} from "@/effect";
import { createPersistence } from "@/persistence";

function createAppModel() {
  const unitInterface = queryUnitInterface("wafer-v01");
  const effectEngine = createEffectEngine(unitInterface);

  const [appState, setAppState] = createStore<{
    parameters: EffectParameters;
    viewActive: boolean;
  }>({
    parameters: defaultEffectParameters,
    viewActive: false,
  });

  const actions = {
    setParameter<K extends keyof EffectParameters>(
      key: K,
      value: EffectParameters[K],
    ) {
      setAppState("parameters", key, value);
      effectEngine.setParameter(key, value);
    },
    setViewActive(active: boolean) {
      setAppState("viewActive", active);
    },
    applyParameters(parameters: EffectParameters) {
      setAppState("parameters", parameters);
      effectEngine.setParameter("volume", parameters.volume);
    },
  };

  const persistence = createPersistence({
    getParameters: () => appState.parameters,
    applyParameters: actions.applyParameters,
  });

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [98, 94],
      },
      unitCallbacks: {
        setViewActive: actions.setViewActive,
      },
      persistence,
      cleanup: effectEngine.cleanup,
    });
  } else {
    actions.setViewActive(true);
  }

  return {
    getters: {
      parameters: () => appState.parameters,
      viewActive: () => appState.viewActive,
    },
    actions,
  };
}
export const appModel = createAppModel();
