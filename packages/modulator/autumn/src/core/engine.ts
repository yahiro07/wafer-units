import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/core/definitions";

export function createEngine(_unitInterface: UnitInterface | undefined) {
  return {
    connects() {},
    setParameters(_nextParameters: EffectParameters) {},
    cleanup() {},
  };
}
