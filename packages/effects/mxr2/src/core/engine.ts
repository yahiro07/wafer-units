import { UnitInterface } from "wafer-host/unit-types";
import { EffectParameters } from "@/core/definitions";

export function createEngine(unitInterface: UnitInterface | undefined) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const mainDestinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  return {
    setParameters(pr: EffectParameters) {},
    cleanup() {},
  };
}
