import { PartItem } from "@/core/definitions";
import { store } from "@/root/store";
import { clampValue, linearInterpolate } from "@/utils/helpers";
import { AutomationPort } from "wafer-host/unit-types";

type AutomationPartId = "roll" | "crash";
type ParamKind = "pitch" | "volume";

const automationPartToStoreKey: Record<
  AutomationPartId,
  "rollPartItem" | "cymbalPartItem"
> = {
  roll: "rollPartItem",
  crash: "cymbalPartItem",
};

function mapPitchToUnary(value: number): number {
  return clampValue(linearInterpolate(value, -1, 1, 0, 1), 0, 1);
}

function mapPitchFromUnary(unary: number): number {
  return linearInterpolate(clampValue(unary, 0, 1), 0, 1, -1, 1);
}

function parseParameterId(
  id: string,
): { partId: AutomationPartId; kind: ParamKind } | null {
  const [partId, kind] = id.split("_");
  if (partId !== "roll" && partId !== "crash") return null;
  if (kind !== "pitch" && kind !== "volume") return null;
  return { partId, kind };
}

function getPartItem(partId: AutomationPartId): PartItem {
  return store.state[automationPartToStoreKey[partId]];
}

function patchPartItem(partId: AutomationPartId, attrs: Partial<PartItem>) {
  const storeKey = automationPartToStoreKey[partId];
  if (storeKey === "rollPartItem") {
    store.patchRollPartItem(attrs);
  } else {
    store.patchCymbalPartItem(attrs);
  }
}

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      { id: "roll_pitch" },
      { id: "roll_volume" },
      { id: "crash_pitch" },
      { id: "crash_volume" },
    ];
  },
  getParameter(id) {
    const parsed = parseParameterId(id);
    if (!parsed) return undefined;
    const part = getPartItem(parsed.partId);
    if (parsed.kind === "volume") {
      return part.volume;
    }
    return mapPitchToUnary(part.pitchTweak);
  },
  setParameter(id, value) {
    const parsed = parseParameterId(id);
    if (!parsed) return;
    if (parsed.kind === "volume") {
      patchPartItem(parsed.partId, { volume: clampValue(value, 0, 1) });
      return;
    }
    patchPartItem(parsed.partId, {
      pitchTweak: mapPitchFromUnary(value),
    });
  },
};
