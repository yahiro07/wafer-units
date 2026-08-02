export function seqNumbers(n: number): number[] {
  return new Array(n).fill(0).map((_, i) => i);
}

export function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad: number) {
  return rad * (180 / Math.PI);
}

export function npx(value: number) {
  return `${value}px`;
}
