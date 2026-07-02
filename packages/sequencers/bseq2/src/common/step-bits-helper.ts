export function getStep(stepBits: number, stepIndex: number) {
  return (stepBits >> (stepIndex * 2)) & 3; // 0: off, 1: on, 2: tie
}

export function setStep(stepBits: number, stepIndex: number, step: number) {
  return (stepBits & ~(3 << (stepIndex * 2))) | (step << (stepIndex * 2));
}
