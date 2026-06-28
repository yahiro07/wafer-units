import { seqNumbers } from "mofur/ax";
import { createStore } from "snap-store";
import { AutomationLaneItem } from "@/base/types";

export const store = createStore<{
  count: number;
  connected: boolean;
  parameterIds: string[];
  lanes: AutomationLaneItem[];
}>({
  count: 0,
  connected: false,
  parameterIds: [],
  lanes: [
    {
      id: 0,
      enabled: true,
      targetParameterId: null,
      stepValues: seqNumbers(16).map(() => 0.5),
      patternRange: 4,
    },
  ],
});

if (1) {
  store.setParameterIds(["param1", "param2", "param3", "param4", "param5"]);
}
