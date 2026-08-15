import { queryUnitInterface } from "wafer-host/unit-types";
import { automationInput } from "@/root/automation";
import { createEngine } from "@/root/engine";
import { persistence } from "@/root/persistence";
import { store } from "@/root/store";
import { presets } from "@/root/presets";
import { generateRandomPattern } from "@/root/randomizer";
import { decodePreset } from "@/root/preset-decoder";

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
        return ["clear", "rand1", "rand2"];
      },
      applyCommand(commandName) {
        if (commandName === "clear") {
          store.setStepBits(0);
        } else if (commandName === "rand1") {
          const res = generateRandomPattern(false);
          store.assign(res);
        } else if (commandName === "rand2") {
          const res = generateRandomPattern(true);
          store.assign(res);
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
