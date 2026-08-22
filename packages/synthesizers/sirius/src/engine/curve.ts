import { linearInterpolate } from "@/utils/helpers";

export function mapVolumeControlCurveCenterUnityBrokenLinear(value: number) {
  if (value < 0.5) {
    return value / 0.5;
  } else {
    return linearInterpolate(value, 0.5, 1, 1, 1.5);
  }
}
