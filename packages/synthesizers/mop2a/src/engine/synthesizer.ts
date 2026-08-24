import { ISynthesizer, SynthParameters } from "@/defs/definitions";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  return {
    affectParameters(parameters: Partial<SynthParameters>) {},
    noteOn(noteNumber: number, time?: number) {},
    noteOff(noteNumber: number, time?: number) {},
    cleanup() {},
  };
}
