import { createStore } from "snap-store";
import { AutomationLaneItem } from "@/base/types";
import { seqNumbers } from "@/utils/helpers";

export const store = createStore<{
  lanes: AutomationLaneItem[];
  playbackStepIndex: number;
  viewActive: boolean;
}>({
  lanes: [
    {
      id: 0,
      enabled: true,
      stepValues: seqNumbers(16).map(() => 0.5),
      patternRange: 4,
      clockDivision: 1,
    },
  ],
  playbackStepIndex: -1,
  viewActive: false,
});
