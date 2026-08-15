import { seqNumbers } from "@/utils/helpers";

function randInt(n: number) {
  return Math.floor(Math.random() * n);
}

export function generateRandomPattern(withTie: boolean) {
  const patternRange = ([4, 8, 16] as const)[Math.floor(Math.random() * 3)];

  const sequence = seqNumbers(16).map(() => 0);
  for (let i = 0; i < 16; i++) {
    const prevValue = sequence[i - 1];
    const n = withTie && (prevValue === 1 || prevValue === 2) ? 3 : 2;
    const value = randInt(n);
    sequence[i] = value;
  }
  let stepBits = 0;
  for (let i = 0; i < 16; i++) {
    stepBits |= sequence[i] << (i * 2);
  }
  return { stepBits, patternRange };
}
