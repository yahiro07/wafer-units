import { LfoSlot, LfoWave, YStep } from "@/base/types";
import { store } from "@/root/store";
import { AutomationPort } from "wafer-host/unit-types";

type SlotField = "center" | "wave" | "rate" | "depth" | "yStep";

const waveSteps = 5;
const yStepSteps = 4;

function parseParameterId(
  id: string,
): { field: SlotField; slotIndex: number } | null {
  const match = /^(center|wave|rate|depth|yStep)([12])$/.exec(id);
  if (!match) return null;
  return {
    field: match[1] as SlotField,
    slotIndex: Number(match[2]) - 1,
  };
}

function getSlot(slotIndex: number): LfoSlot | undefined {
  return store.state.slots[slotIndex];
}

function patchSlot(slotIndex: number, attrs: Partial<LfoSlot>) {
  store.setSlots((prev) =>
    prev.map((slot, index) =>
      index === slotIndex ? { ...slot, ...attrs } : slot,
    ),
  );
}

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [1, 2].flatMap((n) => [
      { id: `center${n}` },
      { id: `wave${n}`, steps: waveSteps },
      { id: `rate${n}` },
      { id: `depth${n}` },
      { id: `yStep${n}`, steps: yStepSteps },
    ]);
  },
  getParameter(id) {
    const parsed = parseParameterId(id);
    if (!parsed) return undefined;
    const slot = getSlot(parsed.slotIndex);
    if (!slot) return undefined;
    if (parsed.field === "center") {
      return slot.centerValue;
    } else if (parsed.field === "wave") {
      return slot.wave / (waveSteps - 1);
    } else if (parsed.field === "rate") {
      return slot.rate;
    } else if (parsed.field === "depth") {
      return slot.depth;
    } else {
      return slot.yStep / (yStepSteps - 1);
    }
  },
  setParameter(id, value) {
    const parsed = parseParameterId(id);
    if (!parsed) return;
    if (!getSlot(parsed.slotIndex)) return;
    if (parsed.field === "center") {
      patchSlot(parsed.slotIndex, { centerValue: value });
    } else if (parsed.field === "wave") {
      const wave = Math.round(value * (waveSteps - 1)) as LfoWave;
      patchSlot(parsed.slotIndex, { wave });
    } else if (parsed.field === "rate") {
      patchSlot(parsed.slotIndex, { rate: value });
    } else if (parsed.field === "depth") {
      patchSlot(parsed.slotIndex, { depth: value });
    } else {
      const yStep = Math.round(value * (yStepSteps - 1)) as YStep;
      patchSlot(parsed.slotIndex, { yStep });
    }
  },
};
