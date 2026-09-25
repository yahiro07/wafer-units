import { clampValue } from "@/utils/helpers";

export function power2(value: number) {
  return value * value;
}

export function invPower2(value: number) {
  return 1 - (1 - value) * (1 - value);
}

export function power3(value: number) {
  return value * value * value;
}

//x:-1__1, k:-1__1, positive k for low curve, negative k for high curve
export function tunableSigmoid(x: number, k: number) {
  return (x - k * x) / (k - 2 * k * Math.abs(x) + 1);
}

export function fracPart(value: number) {
  return value - Math.floor(value);
}

export function midiToFrequency(midiNote: number): number {
  return 440 * 2 ** ((midiNote - 69) / 12);
}

export function mapUnaryTo(value: number, d0: number, d1: number) {
  return d0 + (d1 - d0) * value;
}

export function mapUnaryFrom(
  val: number,
  lo: number,
  hi: number,
  clamp?: boolean,
) {
  if (hi === lo) return lo;
  const v = (val - lo) / (hi - lo);
  if (clamp) {
    return clampValue(v, 0, 1);
  }
  return v;
}

export function mixValue(a: number, b: number, m: number) {
  return (1 - m) * a + m * b;
}
