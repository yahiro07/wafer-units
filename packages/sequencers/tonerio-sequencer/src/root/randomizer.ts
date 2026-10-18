import { seqNumbers, setBit } from "@/utils/helpers";

function getRandomPitch() {
  if (Math.random() < 0.2) return 0; //add weight for root note
  return Math.floor(Math.random() * 8);
}

export function generateRandomStepBits() {
  const stepBits = seqNumbers(8).map(() => 0);
  let prevYi = 0;
  for (let i = 0; i < 16; i++) {
    let yi = getRandomPitch();
    if (i >= 1 && yi === prevYi) {
      //retry to reduce the same pitch
      yi = getRandomPitch();
      if (yi === prevYi) {
        yi = getRandomPitch();
      }
    }
    stepBits[yi] = setBit(stepBits[yi], i);
    prevYi = yi;
  }
  return stepBits;
}
