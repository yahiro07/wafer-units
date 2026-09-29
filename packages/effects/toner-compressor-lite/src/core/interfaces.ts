import { EffectParameters } from "@/core/definitions";

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  setEnabled(enabled: boolean): void;
  setSideChain(sideChain: boolean): void;
  cleanup(): void;
};
