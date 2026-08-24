import { SynthParameters } from "@/defs/definitions";
import { createSynthesizerEngine } from "@/engine/synthesizer";
import { store } from "@/root/store";
import { filterChangedFields } from "@/utils/helpers";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const synthEngine = createSynthesizerEngine(unitInterface);

function setupSynchronization() {
  let latestParameters: Partial<SynthParameters> = {};
  return store.subscribe(({ parameters }) => {
    if (parameters) {
      const changedAttrs = filterChangedFields<SynthParameters>(
        latestParameters,
        parameters,
      );
      synthEngine.affectParameters(changedAttrs);
      Object.assign(latestParameters, parameters);
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupSynchronization, []);
}
