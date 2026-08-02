import { createStore } from "snap-store";
import { LfoSlot, LfoWave, XStep, YStep } from "@/base/types";
import { seqNumbers } from "@/utils/helpers";

export const store = createStore<{
  connected: boolean;
  parameterIds: string[];
  slots: LfoSlot[];
}>({
  connected: false,
  parameterIds: [],
  slots: seqNumbers(4).map((i) => ({
    id: i,
    enabled: true,
    targetParameterId: "",
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

if (import.meta.env.DEV) {
  store.setParameterIds(["param1", "param2", "param3", "param4", "param5"]);
}
