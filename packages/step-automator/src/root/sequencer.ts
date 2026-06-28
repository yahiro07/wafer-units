import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { gaugeReferenceIndexMap } from "@/base/constants";
import { AutomationLaneItem } from "@/base/types";

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const state = {
    lanes: [] as AutomationLaneItem[],
  };
  const sentValues: Record<string, number> = {};

  const clockHandlers: ClockHandlers = {
    start() {},
    // processScheduling(timeFrom, barFrom, barTo, bpm) {},
    processStep(stepIndex, time, unitDuration) {
      for (const lane of state.lanes) {
        if (lane.enabled && lane.targetParameterId) {
          const referenceIndex =
            gaugeReferenceIndexMap[lane.patternRange][stepIndex % 16];
          const value = lane.stepValues[referenceIndex];
          if (!Number.isFinite(value)) continue;
          if (value !== sentValues[lane.targetParameterId]) {
            unitInterface?.automationOutputPort?.setParameter(
              lane.targetParameterId,
              value,
            );
            sentValues[lane.targetParameterId] = value;
          }
        }
      }
    },
    stop() {},
  };
  return {
    setAutomationLanes(lanes: AutomationLaneItem[]) {
      state.lanes = lanes;
    },
    clockHandlers,
  };
}
