import { mapUnaryTo } from "@/utils/synth-math-utils";

export function createCustomCurveBuilder() {
  const n = 32;
  const points = new Float32Array(n);
  return {
    map(v0: number, v1: number, k: number) {
      for (let i = 0; i < n; i++) {
        const x = i / (n - 1);
        const y = k === 1 ? x : 1 - (Math.pow(k, x) - k) * (1 / (1 - k));
        points[i] = mapUnaryTo(y, v0, v1);
      }
      return points;
    },
  };
}
