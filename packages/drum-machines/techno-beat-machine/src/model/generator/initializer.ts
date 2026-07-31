import { PartItem, PartKey } from "@/model/defs";
import { seqNumbers } from "@/utils/helpers";

export function createDefaultPartItem(partKey: PartKey): PartItem {
  return {
    partKey,
    style: "fourByFour",
    sampleKey: `${partKey.toLowerCase()}1`,
    pitchTweak: 0,
    weakVelocity: 0.5,
    volume: 0.5,
    stepLength: 16,
    notes: seqNumbers(16).map(() => null),
    outputActive: true,
  };
}
