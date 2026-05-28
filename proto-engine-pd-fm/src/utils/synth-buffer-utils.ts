import { mixValue } from "@/utils/number-utils";

export function readBufferInterpolated(
  buffer: number[] | Float32Array,
  fIndex: number,
): number {
  const sz = buffer.length;
  const idx0 = fIndex >> 0;
  const idx1 = (idx0 + 1) % sz;
  const fraction = fIndex - idx0;
  return mixValue(buffer[idx0], buffer[idx1], fraction);
}

export function removeDcOffsetInBuffer(buffer: Float32Array) {
  const sz = buffer.length;
  let sum = 0;
  for (let i = 0; i < sz; i++) {
    sum += buffer[i];
  }
  const mean = sum / sz;
  for (let i = 0; i < sz; i++) {
    buffer[i] -= mean;
  }
  return buffer;
}
