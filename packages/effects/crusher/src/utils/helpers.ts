export function mapUnaryToArray(value: number, array: number[]) {
  return array[Math.min(Math.floor(value * array.length), array.length - 1)];
}
