import { seqNumbers } from "mofus/ax";

export function createShaperCurveBufferCache(
  size: number,
  updateFn: (buffer: Float32Array, wave: number, level: number) => void,
) {
  let currentKey = "";
  const buffers = seqNumbers(2).map(() => new Float32Array(size));
  return {
    update(wave: number, level: number) {
      const key = `${wave}_${level}`;
      if (key !== currentKey) {
        [buffers[0], buffers[1]] = [buffers[1], buffers[0]];
        updateFn(buffers[0], wave, level);
        currentKey = key;
      }
      return buffers[0];
    },
  };
}
