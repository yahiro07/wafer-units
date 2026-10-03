import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";
import {
  SynthesizerEngine,
  ParameterEditSpec,
  type SynthParameters,
  defaultSynthParameters,
  IEditParametersReceiver,
} from "./core/definitions";
import { createSynthesizerEngine } from "./core/synthesizer-engine";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";
import { createPersistenceImpl } from "./persistence.svelte.ts";
import { createAutomationInput } from "./automation-input.ts";

type AppStates = {
  parameters: SynthParameters;
  viewActive: boolean;
};

const defaultAppStates: AppStates = {
  parameters: defaultSynthParameters,
  viewActive: false,
};

export type AppModel = {
  states: AppStates;
  cleanup(): void;
  dispatchParameterEdit(spec: ParameterEditSpec): void;
};

function createEngine(unitInterface: UnitInterface | undefined) {
  const rawParameters = structuredClone(defaultSynthParameters);
  const engine = createSynthesizerEngine(unitInterface, rawParameters);
  engine.applyParameters(rawParameters);
  return engine;
}

function setupUnit(
  unitInterface: UnitInterface | undefined,
  engine: SynthesizerEngine,
  states: AppStates,
  editParametersReceiver: IEditParametersReceiver,
) {
  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        viewSize: [900, 570],
      },
      cleanup: engine.cleanup,
      unitCallbacks: {
        setViewActive(value) {
          states.viewActive = value;
        },
      },
      noteInput: {
        noteOn(noteNumber, time) {
          engine.noteOn(noteNumber, time);
        },
        noteOff(noteNumber, time) {
          engine.noteOff(noteNumber, time);
        },
      },
      persistence: createPersistenceImpl(states, engine),
      automationInput: createAutomationInput(
        () => states.parameters,
        editParametersReceiver,
      ),
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

  const editParametersReceiver: IEditParametersReceiver = {
    dispatchParameterEdit(spec) {
      engine.applyParameters(spec);
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        const attrs = spec[key];
        Object.assign(states.parameters[key], attrs);
      }
    },
  };
  const cleanupUnit = setupUnit(
    unitInterface,
    engine,
    states,
    editParametersReceiver,
  );
  return {
    states,
    dispatchParameterEdit: editParametersReceiver.dispatchParameterEdit,
    cleanup() {
      cleanupUnit?.();
    },
  };
}
