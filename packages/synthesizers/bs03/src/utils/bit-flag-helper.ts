export function isBitSet(bits: number, position: number) {
  return (bits & (1 << position)) > 0;
}

export function setBit(bits: number, position: number) {
  return bits | (1 << position);
}

export function clearBit(bits: number, position: number) {
  return bits & ~(1 << position);
}

export function toggleBit(bits: number, position: number) {
  return bits ^ (1 << position);
}
