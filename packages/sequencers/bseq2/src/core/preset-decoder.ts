import { PatternRange } from "@/core/defs";

export function decodePreset(
  preset: string,
): { stepBits: number; patternRange: PatternRange } | undefined {
  const steps = preset
    .replace(/_/g, "")
    .split("")
    .map((value) => parseInt(value));
  const patternRange = steps.length as PatternRange;
  if (![4, 8, 16].includes(patternRange)) {
    console.warn(`Invalid pattern range: ${patternRange}`);
    return undefined;
  }
  let stepBits = 0;
  for (let i = 0; i < steps.length; i++) {
    stepBits |= steps[i] << (i * 2);
  }
  return {
    stepBits,
    patternRange,
  };
}
