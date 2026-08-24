import { SynthParameters } from "@/defs/definitions";
import { createSynthesizerEngine } from "@/engine/synthesizer";
import { store } from "@/root/store";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
export const engine = createSynthesizerEngine(unitInterface);

function setupSynchronization() {
  let latestParameters: Partial<SynthParameters> = {};
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      const changedAttrs: Partial<SynthParameters> = {};
      for (const _key in parameters) {
        const key = _key as keyof SynthParameters;
        if (parameters[key] !== latestParameters[key]) {
          changedAttrs[key] = parameters[key] as any;
          latestParameters[key] = parameters[key] as any;
        }
      }
      engine.affectParameters(changedAttrs);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupSynchronization, []);
}
