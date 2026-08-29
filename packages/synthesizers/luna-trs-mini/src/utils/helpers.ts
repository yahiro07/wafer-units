export function seqNumbers(n: number): number[] {
  return new Array(n).fill(0).map((_, i) => i);
}

export function fillArray<T>(n: number, value: T): T[] {
  return new Array(n).fill(value);
}

export function iife<T>(fn: () => T): T {
  return fn();
}

export function bottomLimit(value: number, lo: number) {
  return Math.max(value, lo);
}

export function topLimit(value: number, hi: number) {
  return Math.min(value, hi);
}

export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function inBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
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

export function removeArrayItem<T>(items: T[], item: T) {
  const index = items.indexOf(item);
  if (index >= 0) {
    items.splice(index, 1);
  }
}

export function removeArrayItems<T>(items: T[], cond: (item: T) => boolean) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (cond(items[i])) {
      items.splice(i, 1);
    }
  }
}
