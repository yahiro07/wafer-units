import { seqNumbers } from "mofur/ax";
import { createStore } from "snap-store";
import { LfoSlot, LfoWave, XStep, YStep } from "@/base/types";

export const store = createStore<{
  count: number;
  connected: boolean;
  parameterIds: string[];
  slots: LfoSlot[];
}>({
  count: 0,
  connected: false,
  parameterIds: [],
  slots: seqNumbers(4).map((i) => ({
    id: i,
    enabled: true,
    targetParameterId: null,
    wave: LfoWave.Sine,
    centerValue: 0.5,
    rate: 0.5,
    rateStepped: true,
    depth: 0.5,
    xStep: XStep.None,
    yStep: YStep.None,
    inverted: false,
    shifted: false,
  })),
});

if (1) {
  store.setParameterIds(["param1", "param2", "param3", "param4", "param5"]);
}
