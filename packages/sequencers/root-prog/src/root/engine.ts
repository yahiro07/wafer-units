import { UnitInterface } from "wafer-host/unit-types";

export function createEngine(unitInterface: UnitInterface | undefined) {
  return {
    setParameters: () => {},
    noteOn: () => {},
    noteOff: () => {},
    setBpm: () => {},
  };
}
