import { createStore } from "snap-store";
import { AutomationLaneItem } from "@/base/types";
import { seqNumbers } from "@/utils/helpers";

export const store = createStore<{
  connected: boolean;
  parameterIds: string[];
  lanes: AutomationLaneItem[];
  playbackStepIndex: number;
}>({
  connected: false,
  parameterIds: [],
  lanes: [
    {
      id: 0,
      enabled: true,
      targetParameterId: null,
      stepValues: seqNumbers(16).map(() => 0.5),
      patternRange: 4,
      clockDivision: 1,
    },
  ],
  playbackStepIndex: -1,
});

if (0) {
  store.setParameterIds(["param1", "param2", "param3", "param4", "param5"]);
}
