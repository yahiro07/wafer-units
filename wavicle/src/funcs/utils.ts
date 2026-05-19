export namespace nums {
  export function lerp(a: number, b: number, t: number) {
    return (1.0 - t) * a + t * b;
  }

  export function clamp(value: number, low: number, high: number) {
    if (value < low) return low;
    if (value > high) return high;
    return value;
  }

  export function lerpMap(
    val: number,
    s0: number,
    s1: number,
    d0: number,
    d1: number,
    clamp?: boolean
  ) {
    const res = ((val - s0) / (s1 - s0)) * (d1 - d0) + d0;
    if (clamp) {
      const hi = Math.max(d0, d1);
      const lo = Math.min(d0, d1);
      if (res > hi) return hi;
      if (res < lo) return lo;
    }
    return res;
  }

  export function between(value: number, lo: number, hi: number) {
    return lo <= value && value <= hi;
  }
}

export namespace arrays {
  export function seq(n: number) {
    return new Array(n).fill(0).map((_, i) => i);
  }

  export function range(lo: number, hi: number) {
    return seq(hi + 1 - lo).map((i) => lo + i);
  }

  export function remove<T>(ar: T[], a: T) {
    let i = 0;
    while (i < ar.length) {
      if (ar[i] === a) {
        ar.splice(i, 1);
        continue;
      }
      i++;
    }
  }
}
