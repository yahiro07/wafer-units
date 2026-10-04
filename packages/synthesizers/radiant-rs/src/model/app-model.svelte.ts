import { queryUnitInterface, UnitInterface } from "wafer-host/unit-types";
import {
  SynthesizerEngine,
  ParameterEditSpec,
  type SynthParameters,
  defaultSynthParameters,
  ParametersFacade,
} from "../core/definitions.ts";
import { createSynthesizerEngine } from "../core/synthesizer-engine.ts";
import { setupMidiKeyboardInput } from "@lib/mu2609/utils/midi-keyboard-input";
import { createPersistenceImpl } from "./persistence.svelte.ts";
import { createAutomationInput } from "./automation-input.ts";
import { createRandomParameters } from "./randomizer.ts";
import { appEnvs } from "../common/app-envs.ts";
import { presets } from "../core/presets.ts";

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
  dispatchParameterEdit(spec: ParameterEditSpec): void;
  cleanup(): void;
};

function createEngine(unitInterface: UnitInterface | undefined) {
  const rawParameters = structuredClone(defaultSynthParameters);
  const engine = createSynthesizerEngine(unitInterface, rawParameters);
  engine.applyParameters(rawParameters);
  return engine;
}

function createParametersFacade(
  engine: SynthesizerEngine,
  states: AppStates,
): ParametersFacade {
  const getParameters = () => $state.snapshot(states.parameters);
  return {
    getParameters,
    setParameters(parameters) {
      for (const _key in parameters) {
        const key = _key as keyof SynthParameters;
        Object.assign(states.parameters[key], parameters[key]);
      }
      engine.applyParameters(parameters);
    },
    dispatchParameterEdit(spec) {
      engine.applyParameters(spec);
      for (const _key in spec) {
        const key = _key as keyof SynthParameters;
        const attrs = spec[key];
        Object.assign(states.parameters[key], attrs);
      }
    },
    dumpParameters() {
      function formatSection(value: object): string {
        const body = Object.entries(value)
          .map(([key, item]) => `${key}: ${JSON.stringify(item)}`)
          .join(", ");
        return `{ ${body} }`;
      }
      function formatParameters(parameters: SynthParameters): string {
        const lines = Object.entries(parameters).map(
          ([key, value]) => `  ${key}: ${formatSection(value)},`,
        );
        const text = `{\n${lines.join("\n")}\n}`;
        return text.replace(/(?<![0-9])0\.\d+/g, (match) =>
          (Math.round(Number(match) * 100) / 100).toString(),
        );
      }
      const parameters = getParameters();
      const formattedText = formatParameters(parameters);
      console.log(formattedText);
    },
  };
}

function setupUnit(
  unitInterface: UnitInterface | undefined,
  engine: SynthesizerEngine,
  states: AppStates,
  parametersFacade: ParametersFacade,
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
      persistence: createPersistenceImpl(parametersFacade),
      automationInput: createAutomationInput(parametersFacade),
      presetProvider: {
        getPresetNames() {
          return Object.keys(presets);
        },
        applyPreset(presetName) {
          const preset = presets[presetName as keyof typeof presets];
          if (preset) {
            parametersFacade.setParameters(preset);
          }
        },
        getCommandNames() {
          return appEnvs.isDevelopment || appEnvs.isLocalDebug
            ? ["init", "rand", "dump"]
            : ["init", "rand"];
        },
        applyCommand(commandName) {
          if (commandName === "init") {
            parametersFacade.setParameters(defaultSynthParameters);
          } else if (commandName === "rand") {
            const newParameters = createRandomParameters();
            parametersFacade.setParameters(newParameters);
          } else if (commandName === "dump") {
            parametersFacade.dumpParameters();
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

  const parametersFacade = createParametersFacade(engine, states);
  const cleanupUnit = setupUnit(
    unitInterface,
    engine,
    states,
    parametersFacade,
  );
  return {
    states,
    dispatchParameterEdit: parametersFacade.dispatchParameterEdit,
    cleanup() {
      cleanupUnit?.();
    },
  };
}
