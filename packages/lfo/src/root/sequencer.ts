import { clampValue, mapUnaryTo } from "mofur/ax";
import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { LfoSlot } from "@/base/types";
import { mapUnaryToArray } from "@/utils/helpers";

export function createSequencer(unitInterface: UnitInterface | undefined) {
  const state = {
    lfoSlots: [] as LfoSlot[],
  };

  const speedRates = [1 / 16, 1 / 8, 1 / 4, 1 / 2, 1, 2, 4, 8, 16];

  const sentValues: Record<string, number> = {};

  const clockHandlers: ClockHandlers = {
    start() {},
    // processScheduling(timeFrom, barFrom, barTo, bpm) {},
    processStep(stepIndex, time, unitDuration) {
      for (const slot of state.lfoSlots) {
        if (slot.enabled && slot.targetParameterId) {
          const speedRate = mapUnaryToArray(slot.rate, speedRates);
          const hi = slot.centerValue + slot.depth / 2;
          const lo = slot.centerValue - slot.depth / 2;
          const lfoValue = clampValue(
            Math.sin((stepIndex / 16) * Math.PI * 2 * speedRate) * 0.5 + 0.5,
            0,
            1,
          );
          const value = mapUnaryTo(lfoValue, lo, hi);
          if (value !== sentValues[slot.targetParameterId]) {
            unitInterface?.automationOutputPort?.setParameter(
              slot.targetParameterId,
              value,
            );
            sentValues[slot.targetParameterId] = value;
          }
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
