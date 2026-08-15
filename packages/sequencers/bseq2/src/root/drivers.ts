import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { decodePreset, presets } from "@/root/presets";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createEngine(unitInterface);

export function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [480, 200],
    },
    noteInput: engine.noteInput,
    clockHandlers: {
      start() {
        engine.clockHandlers.start?.();
      },
      processStep(inputStepIndex, time, unitDuration) {
        engine.clockHandlers.processStep?.(inputStepIndex, time, unitDuration);
        const stepIndex = inputStepIndex % 16;
        store.setPlayPos(stepIndex);
      },
      stop() {
        engine.clockHandlers.stop?.();
        store.setPlayPos(-1);
      },
    },
    presetProvider: {
      getCommandNames() {
        return ["clear", "random"];
      },
      applyCommand(commandName) {
        if (commandName === "clear") {
          store.setStepBits(0);
        } else if (commandName === "random") {
          const patternRange = ([4, 8, 16] as const)[
            Math.floor(Math.random() * 3)
          ];
          const stepBits = Math.round(Math.random() * 0xffffffff);
          store.assign({ stepBits, patternRange });
        }
      },
      getPresetNames() {
        return Object.keys(presets);
      },
      applyPreset(presetName: string) {
        const pattern = presets[presetName as keyof typeof presets];
        if (pattern) {
          const res = decodePreset(pattern);
          if (res) {
            const { stepBits, patternRange } = res;
            store.assign({ stepBits, patternRange });
          }
        }
      },
    },
    persistence: persistence,
    automationInput: automationInput,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ octave, duty, patternRange, stepBits }) => {
    if (octave !== undefined) {
      engine.setState({ octave });
    }
    if (duty !== undefined) {
      engine.setState({ duty });
    }
    if (patternRange !== undefined) {
      engine.setState({ patternRange });
    }
    if (stepBits !== undefined) {
      engine.setState({ stepBits });
    }
  }, true);
}
