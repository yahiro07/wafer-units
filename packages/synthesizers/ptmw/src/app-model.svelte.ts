import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";
import {
  EffectEngine,
  ParameterEditSpec,
  type SynthParameters,
  defaultSynthParameters,
} from "./core/definitions";
import { createEffectEngine } from "./core/effect-engine";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";

type AppStates = {
  parameters: SynthParameters;
  viewActive: boolean;
};

const defaultAppStates: AppStates = {
  parameters: defaultSynthParameters,
  viewActive: false,
};

export type EditOperator = {
  dispatchParameterEdit(spec: ParameterEditSpec): void;
};

export type AppModel = {
  states: AppStates;
  cleanup(): void;
  editOperator: EditOperator;
};

function createEngine(unitInterface: UnitInterface | undefined) {
  const rawParameters = structuredClone(defaultSynthParameters);
  const engine = createEffectEngine(unitInterface, rawParameters);
  engine.applyParameters(rawParameters);
  return engine;
}

function setupUnit(
  unitInterface: UnitInterface | undefined,
  engine: EffectEngine,
  states: AppStates,
) {
  if (unitInterface) {
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
          return { parameters: $state.snapshot(states.parameters) };
        },
        applyState(data) {
          Object.assign(states.parameters, data.parameters);
          engine.applyParameters(data.parameters);
        },
      },
    });
  } else {
    states.viewActive = true;
    return setupMidiKeyboardInput({
      noteOn: engine.noteOn,
      noteOff: engine.noteOff,
    });
  }
}

export function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");

  const engine = createEngine(unitInterface);
  const states = $state(structuredClone(defaultAppStates));

  const cleanupUnit = setupUnit(unitInterface, engine, states);

  const editOperator: EditOperator = {
    dispatchParameterEdit(spec) {
      engine.applyParameters(spec);
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        const attrs = spec[key];
        Object.assign(states.parameters[key], attrs);
      }
    },
  };

  return {
    states,
    editOperator,
    cleanup() {
      cleanupUnit?.();
    },
  };
}
