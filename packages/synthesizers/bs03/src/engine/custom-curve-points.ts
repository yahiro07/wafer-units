export function createCustomCurvePoints(v1: number) {
  const n = 32;
  const points = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    points[i] = (Math.pow(v1, t) - v1) / (1 - v1);
  }
  return points;
}
