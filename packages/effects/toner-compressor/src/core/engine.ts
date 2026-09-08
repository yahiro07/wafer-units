import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/core/definitions";

export function createEngine(unitInterface: UnitInterface | undefined) {
  return {
    connects() {},
    setParameters(nextParameters: EffectParameters) {},
    cleanup() {},
  };
}
