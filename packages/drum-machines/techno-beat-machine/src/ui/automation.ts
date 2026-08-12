import {
  allPartKeys,
  PartKey,
  pitchTweakRangeMap,
} from "@/model/defs";
import { store } from "@/ui/store/store";
import { clampValue, linearInterpolate } from "@/utils/helpers";
import { AutomationPort } from "wafer-host/unit-types";

type PartParamKind = "pitch" | "vol";

function mapUnaryFrom(value: number, min: number, max: number): number {
  return clampValue(linearInterpolate(value, min, max, 0, 1), 0, 1);
}

function mapUnaryTo(unary: number, min: number, max: number): number {
  return linearInterpolate(clampValue(unary, 0, 1), 0, 1, min, max);
}

function parsePartParameterId(
  id: string,
): { partKey: PartKey; kind: PartParamKind } | null {
  const [prefix, kind] = id.split("_");
  if (kind !== "pitch" && kind !== "vol") return null;
  const partKey = allPartKeys.find((key) => key.toLowerCase() === prefix);
  if (!partKey) return null;
  return { partKey, kind };
}

function patchPart(
  partKey: PartKey,
  attrs: { pitchTweak?: number; volume?: number },
) {
  store.producePartItems((draft) => {
    const item = draft.find((part) => part.partKey === partKey);
    if (item) {
      Object.assign(item, attrs);
    }
  });
}

export const automationInput: AutomationPort = {
  getParameterSpecs() {
    return [
      ...allPartKeys.flatMap((partKey) => {
        const [min, max, type] = pitchTweakRangeMap[partKey];
        const prefix = partKey.toLowerCase();
        return [
          type === "integer"
            ? { id: `${prefix}_pitch`, steps: max - min + 1 }
            : { id: `${prefix}_pitch` },
          { id: `${prefix}_vol` },
        ];
      }),
      { id: "master" },
    ];
  },
  getParameter(id) {
    if (id === "master") {
      return store.state.masterVolume;
    }
    const parsed = parsePartParameterId(id);
    if (!parsed) return undefined;
    const part = store.state.partItems.find(
      (item) => item.partKey === parsed.partKey,
    );
    if (!part) return undefined;
    if (parsed.kind === "vol") {
      return part.volume;
    }
    const [min, max] = pitchTweakRangeMap[parsed.partKey];
    return mapUnaryFrom(part.pitchTweak, min, max);
  },
  setParameter(id, value) {
    if (id === "master") {
      store.setMasterVolume(clampValue(value, 0, 1));
      return;
    }
    const parsed = parsePartParameterId(id);
    if (!parsed) return;
    if (parsed.kind === "vol") {
      patchPart(parsed.partKey, { volume: clampValue(value, 0, 1) });
      return;
    }
    const [min, max, type] = pitchTweakRangeMap[parsed.partKey];
    const mapped = mapUnaryTo(value, min, max);
    patchPart(parsed.partKey, {
      pitchTweak: type === "integer" ? Math.round(mapped) : mapped,
    });
  },
};
