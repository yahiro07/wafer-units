import { PartKey, sampleVariationCounts } from "@/model/defs";
import { seqNumbers, uniqueArrayItems } from "@/utils/helpers";
import { createPlainSelectorOptions } from "@/utils/selector-option";

function createSampleVariationKeys(partKey: PartKey) {
  return seqNumbers(sampleVariationCounts[partKey]).map(
    (i) => `${partKey.toLowerCase()}${i + 1}`,
  );
}

export const sampleVariationsMap: Record<PartKey, string[]> = {
  BD: createSampleVariationKeys("BD"),
  BS: createSampleVariationKeys("BS"),
  CL: createSampleVariationKeys("CL"),
  HC: [...createSampleVariationKeys("HC"), ...createSampleVariationKeys("HO")],
  HO: [...createSampleVariationKeys("HO"), ...createSampleVariationKeys("HC")],
  PR: createSampleVariationKeys("PR"),
  RD: createSampleVariationKeys("RD"),
  SN: createSampleVariationKeys("SN"),
  ST: createSampleVariationKeys("ST"),
};

export const allSampleKeys = uniqueArrayItems(
  Object.values(sampleVariationsMap).flat(),
);

export const stepLengthOptions = createPlainSelectorOptions([4, 8, 16, 32]);
