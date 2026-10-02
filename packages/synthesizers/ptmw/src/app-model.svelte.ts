import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";
import {
  OscId,
  OscParameterKey,
  OscParameters,
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
  setOscParameter<K extends OscParameterKey>(
    oscId: OscId,
    key: K,
    value: OscParameters[K],
  ): void;
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

export function createAppModel(): AppModel {
  const unitInterface = queryUnitInterface("wafer-v01");

  const engine = createEngine(unitInterface);

  const states = $state(structuredClone(defaultAppStates));

  const { osc1, osc2, osc3 } = engine;
  const { parameters } = states;

  $effect(() => {
    const params = $state.snapshot(parameters.osc1);
    osc1.updateParameters(params);
  });

  $effect(() => {
    const params = $state.snapshot(parameters.osc2);
    osc2.updateParameters(params);
  });

  $effect(() => {
    const params = $state.snapshot(parameters.osc3);
    osc3.updateParameters(params);
  });

  const internal = {
    noteOn(noteNumber: number) {
      // engine.noteOn(noteNumber);
      osc1.noteOn(noteNumber, parameters.osc1);
      osc2.noteOn(noteNumber, parameters.osc2);
      osc3.noteOn(noteNumber, parameters.osc3);
    },
    noteOff(noteNumber: number) {
      // engine.noteOff(noteNumber);
      osc1.noteOff(noteNumber);
      osc2.noteOff(noteNumber);
      osc3.noteOff(noteNumber);
    },
  };

  function setupUnit(
    // unitInterface: UnitInterface | undefined,
    // engine: EffectEngine,
    // states: AppStates,
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
            // engine.affectParametersAll();
          },
        },
      });
    } else {
      states.viewActive = true;
      return setupMidiKeyboardInput({
        noteOn: internal.noteOn,
        noteOff: internal.noteOff,
      });
    }
  }

  const cleanupUnit = setupUnit(); //unitInterface, engine, states);

  const editOperator: EditOperator = {
    setOscParameter(oscId, key, value) {
      states.parameters[oscId][key] = value;
    },
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
