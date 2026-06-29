import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/common/types";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const state = {
    bpm: 120,
    parameters: {
      rate: 16,
      feed: 0.5,
      mix: 0.5,
    } as EffectParameters,
  };

  return {
    setParameters(parameters: EffectParameters) {
      state.parameters = parameters;
    },
    setBpm(bpm: number) {
      state.bpm = bpm;
    },
  };
}
