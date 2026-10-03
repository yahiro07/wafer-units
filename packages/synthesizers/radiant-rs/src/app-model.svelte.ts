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
import { createRandomParameters } from "./randomizer.ts";

type AppStates = {
  parameters: SynthParameters;
  viewActive: boolean;
  affectMixForPreview: boolean;
};

const defaultAppStates: AppStates = {
  parameters: defaultSynthParameters,
  viewActive: false,
  affectMixForPreview: false,
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
  const getParameters = () => $state.snapshot(states.parameters);
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
      persistence: createPersistenceImpl(getParameters, editParametersReceiver),
      automationInput: createAutomationInput(
        getParameters,
        editParametersReceiver,
      ),
      presetProvider: {
        getCommandNames() {
          return ["init", "rand"];
        },
        applyCommand(commandName) {
          if (commandName === "init") {
            editParametersReceiver.setAllParameters(defaultSynthParameters);
          } else if (commandName === "rand") {
            const newParameters = createRandomParameters();
            editParametersReceiver.setAllParameters(newParameters);
          }
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

  const editParametersReceiver: IEditParametersReceiver = {
    dispatchParameterEdit(spec) {
      engine.applyParameters(spec);
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        const attrs = spec[key];
        Object.assign(states.parameters[key], attrs);
      }
    },
    setAllParameters(parameters) {
      for (const _key in parameters) {
        const key = _key as keyof SynthParameters;
        Object.assign(states.parameters[key], parameters[key]);
      }
      engine.applyParameters(parameters);
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
