import { ISynthesizer, SynthParameters } from "@/root/definitions";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizerEngine(
  unitInterface: UnitInterface | undefined,
): ISynthesizer {
  return {
    setParameters: (parameters: SynthParameters) => {},
    noteOn: (noteNumber: number, time?: number) => {},
    noteOff: (noteNumber: number, time?: number) => {},
    cleanup: () => {},
  };
}
