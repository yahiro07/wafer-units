import { PatternRange } from "@/common/defs";

export const presets = {
  bass1: "0012",
  bass2: "0011",
  bass3: "0111",
  "tr-gate": "1112",
  bar: "1222_2222_2222_2222",
  half: "1222_2222",
  quarter: "1222",
  "dot8-1": "120_120_12",
  "dot8-2": "122_122_12",
  pt1: "1212_1112",
  pt2: "1220_12_12",
  pt3: "100_10_111_10_10_10_10",
};

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
