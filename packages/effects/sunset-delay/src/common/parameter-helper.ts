import { delayTimeValues } from "@/common/constants";
import { DelayTime } from "@/common/types";

export function pickNearestDelayTime(time: number): DelayTime {
  const distances = delayTimeValues.map((value) => Math.abs(value - time));
  const minDistance = Math.min(...distances);
  return (delayTimeValues[distances.indexOf(minDistance)] ?? 1) as DelayTime;
}

export function pickNearestDelayTimeIndex(time: number): number {
  const distances = delayTimeValues.map((value) => Math.abs(value - time));
  const minDistance = Math.min(...distances);
  return distances.indexOf(minDistance) ?? 0;
}
