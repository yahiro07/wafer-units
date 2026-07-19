import {
  AutomationPort,
  ClockHandlers,
  UnitInterface,
} from "wafer-host/unit-types";
import { LfoSlot, LfoWave } from "@/base/types";
import {
  clampValue,
  highClip,
  lowClip,
  mapUnaryTo,
  mapUnaryToArray,
  seqNumbers,
} from "@/utils/helpers";

const randomSequence = seqNumbers(100).map(() => Math.random());

function getLfoValue(wave: LfoWave, phase: number, shifted: boolean) {
  let pp = phase - Math.floor(phase);
  if (shifted && wave !== LfoWave.SampleHold) {
    const shiftAmount = wave === LfoWave.Saw ? 0.5 : 0.25;
    pp = (pp - shiftAmount + 1) % 1;
  }
  if (wave === LfoWave.Sine) {
    return -Math.cos(2 * Math.PI * pp) * 0.5 + 0.5;
  } else if (wave === LfoWave.Triangle) {
    return pp < 0.5 ? pp * 2 : 1 - (pp - 0.5) * 2;
  } else if (wave === LfoWave.Saw) {
    return 1 - pp;
  } else if (wave === LfoWave.Rect) {
    return pp < 0.5 ? 1 : 0;
  } else if (wave === LfoWave.SampleHold) {
    return randomSequence[((phase * 16) >>> 0) % randomSequence.length];
  }
  return 0;
}

export function createSequencer(
  unitInterface: UnitInterface | undefined,
  automationOutputPort: AutomationPort | undefined,
) {
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
          const hi = highClip(slot.centerValue + slot.depth / 2, 1);
          const lo = lowClip(slot.centerValue - slot.depth / 2, 0);
          const phase = (stepIndex / 16) * speedRate;
          let y = getLfoValue(slot.wave, phase, slot.shifted);
          if (slot.inverted) {
            y = 1 - y;
          }
          const value = clampValue(mapUnaryTo(y, lo, hi), 0, 1);
          if (value !== sentValues[slot.targetParameterId]) {
            automationOutputPort?.setParameter(slot.targetParameterId, value);
            sentValues[slot.targetParameterId] = value;
          }
        }
      }
    },
    stop() {},
  };
  return {
    automationOutputPort,
    setLfoSlots(lfoSlots: LfoSlot[]) {
      state.lfoSlots = lfoSlots;
    },
    clockHandlers,
  };
}
