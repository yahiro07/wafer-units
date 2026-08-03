export function mapUnaryToArray(value: number, array: number[]) {
  return array[Math.min(Math.floor(value * array.length), array.length - 1)];
}

export function linearInterpolate(
  value: number,
  s0: number,
  s1: number,
  d0: number,
  d1: number,
  clamp?: boolean,
) {
  if (s1 === s0) return d0;
  const v = ((value - s0) / (s1 - s0)) * (d1 - d0) + d0;
  if (clamp) {
    const lo = Math.min(d0, d1);
    const hi = Math.max(d0, d1);
    return Math.min(Math.max(v, lo), hi);
  }
  return v;
}

export function npx(value: number) {
  return `${value}px`;
}

export function unaryToByte(value: number): number {
  return (value * 255) >>> 0;
}

export function unaryFromByte(byte: number): number {
  return byte / 255;
}
