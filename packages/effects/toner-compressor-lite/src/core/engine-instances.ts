import { createEffectEngine } from "@/core/effect-engine";
import { queryUnitInterface } from "wafer-host/unit-types";

export const unitInterface = queryUnitInterface("wafer-v01");
export const effectEngine = createEffectEngine(unitInterface);
