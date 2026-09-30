import { queryUnitInterface, type UnitInterface } from "wafer-host/unit-types";
import {
  type SynthParameters,
  type SynthParameterKey,
  defaultSynthParameters,
  type EffectEngine,
} from "./core/definitions";
import { createEffectEngine } from "./core/effect-engine";

type AppStates = {
  parameters: SynthParameters;
  viewActive: boolean;
};

const defaultAppStates: AppStates = {
  parameters: defaultSynthParameters,
  viewActive: false,
};

type AppModel = {
  states: AppStates;
  setParameter<K extends SynthParameterKey>(
    key: K,
    value: SynthParameters[K],
  ): void;
};

function setupUnit(
  unitInterface: UnitInterface,
  engine: EffectEngine,
  states: AppStates,
) {
  unitInterface.completeSetup({
    unitAspects: {
      unitType: "effect",
      viewSize: [100, 100],
    },
    cleanup: engine.cleanup,
    unitCallbacks: {
      setViewActive(value) {
        states.viewActive = value;
      },
    },
    persistence: {
      emitState() {
        return { parameters: { ...states.parameters } };
      },
      applyState(data) {
        Object.assign(states.parameters, data.parameters);
        engine.affectParametersAll();
      },
    },
  });
}

export function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");

  const states = $state(structuredClone(defaultAppStates));
  const engine = createEffectEngine(unitInterface, states.parameters);

  if (unitInterface) {
    setupUnit(unitInterface, engine, states);
  } else {
    states.viewActive = true;
  }
  return {
    states,
    setParameter(key, value) {
      states.parameters[key] = value;
      engine.affectParameters([key]);
    },
  };
}
