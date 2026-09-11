import { createSamplerEngine } from "@/core/engine";
import { queryUnitInterface } from "wafer-host/unit-types";

export const unitInterface = queryUnitInterface("wafer-v01");
export const engine = createSamplerEngine(unitInterface);
