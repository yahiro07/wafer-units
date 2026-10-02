import { queryUnitInterface, type UnitInterface } from "wafer-host/unit-types";
import {
  type SynthParameters,
  type SynthParameterKey,
  defaultSynthParameters,
  type EffectEngine,
  OscParameters,
  OscId,
  OscParameterKey,
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

type AppModel = {
  states: AppStates;
  setParameter<K extends SynthParameterKey>(
    key: K,
    value: SynthParameters[K],
  ): void;
  setOscParameter<K extends OscParameterKey>(
    oscId: OscId,
    key: K,
    value: OscParameters[K],
  ): void;
  cleanup(): void;
};

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
          return { parameters: structuredClone(states.parameters) };
        },
        applyState(data) {
          Object.assign(states.parameters.osc1, data.parameters.osc1);
          Object.assign(states.parameters.osc2, data.parameters.osc2);
          engine.affectParametersAll();
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

  const states = $state(structuredClone(defaultAppStates));
  const engine = createEffectEngine(unitInterface, states.parameters);
  const cleanupUnit = setupUnit(unitInterface, engine, states);

  return {
    states,
    setParameter(key, value) {
      states.parameters[key] = value;
      engine.affectParameters([key]);
    },
    setOscParameter(oscId, key, value) {
      states.parameters[oscId][key] = value;
      engine.affectParameters([oscId]);
    },
    cleanup() {
      cleanupUnit?.();
    },
  };
}
