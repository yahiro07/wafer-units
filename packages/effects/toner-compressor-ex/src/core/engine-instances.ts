import {
  createAudioAnalysisEngine,
  createDummyEngine,
} from "@/core/analyzer-engine";
import { createEffectEngine } from "@/core/effect-engine";
import { queryUnitInterface } from "wafer-host/unit-types";

export const unitInterface = queryUnitInterface("wafer-v01");

export const effectEngine = createEffectEngine(unitInterface);

export const analyzerEngine = unitInterface
  ? createAudioAnalysisEngine(unitInterface, effectEngine.ioNodeSuit)
  : createDummyEngine();
