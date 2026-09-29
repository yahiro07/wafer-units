import { EffectParameters } from "@/core/definitions";

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};
