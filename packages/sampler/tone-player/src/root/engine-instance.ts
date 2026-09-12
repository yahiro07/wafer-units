import { createSamplerEngine } from "@/engine/engine";
import { queryUnitInterface } from "wafer-host/unit-types";

export const unitInterface = queryUnitInterface("wafer-v01");
export const engine = createSamplerEngine(unitInterface);
