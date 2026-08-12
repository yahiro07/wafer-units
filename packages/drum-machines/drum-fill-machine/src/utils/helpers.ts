export function seqNumbers(n: number): number[] {
  return new Array(n).fill(0).map((_, i) => i);
}

export function iife<T>(fn: () => T): T {
  return fn();
}

export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
    return clampValue(v, lo, hi);
  }
  return v;
}

export function npx(value: number) {
  return `${value}px`;
}

export function pickObjectMembers<T extends {}, K extends keyof T>(
  obj: T,
  keys: K[] | Record<K, 1 | true>,
  options?: { ignoreUndefined?: boolean },
): Pick<T, K> {
  const keysArray = Array.isArray(keys) ? keys : (Object.keys(keys) as K[]);
  const resObject: Pick<T, K> = {} as Pick<T, K>;
  for (const key of keysArray) {
    const value = obj[key];
    if (value === undefined && options?.ignoreUndefined) continue;
    resObject[key] = obj[key];
  }
  return resObject;
}

export function filterObjectValuesNonUndefined<T extends object>(obj: T) {
  const resObject: Partial<T> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value === undefined) continue;
    resObject[key] = value;
  }
  return resObject;
}
