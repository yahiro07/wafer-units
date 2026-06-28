import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { LfoSlot } from "@/base/types";

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const state = {
    lfoSlots: [] as LfoSlot[],
  };

  const clockHandlers: ClockHandlers = {
    start() {},
    // processScheduling(timeFrom, barFrom, barTo, bpm) {},
    processStep(stepIndex, time, unitDuration) {
      for (const slot of state.lfoSlots) {
        if (slot.enabled && slot.targetParameterId) {
          const value = Math.sin((stepIndex / 16) * Math.PI * 2) * 0.5 + 0.5;
          unitInterface?.automationOutputPort?.setParameter(
            slot.targetParameterId,
            value,
          );
        }
      }
    },
    stop() {},
  };
  return {
    setLfoSlots(lfoSlots: LfoSlot[]) {
      state.lfoSlots = lfoSlots;
    },
    clockHandlers,
  };
}
