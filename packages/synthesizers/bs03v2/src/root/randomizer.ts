import { SynthPresetParameters } from "@/defs/definitions";
import { fillNumbers } from "@/utils/helpers";

const randF = () => Math.random();

const randB = (p: number) => Math.random() < p;

const randI = (n: number) => Math.floor(Math.random() * n);

const randRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randRangeI = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randPick = <T>(arr: T[]) => arr[randI(arr.length)];

export function generateRandomParameters(): SynthPresetParameters {
  return {
    oscWave: randI(2),
    filterCutoff: randRange(0.3, 1),
    filterPeak: randF(),
    filterEnvMod: randF(),
    ampDecay: randF(),
    patchVolume: 0.5,
    drive: randF(),
  };
}

function getRandomNote(pitches: number[]) {
  const rootNotes = pitches.filter((p) => p === 0 || p === 12);
  if (rootNotes.length > 0 && randB(0.3)) {
    return randPick(rootNotes);
  }
  return randPick(pitches);
}

export function generateRandomStepPattern(pitches: number[]) {
  const stepNotes = fillNumbers(16, -1);
  const stepModifierFlags = fillNumbers(16, 0);
  for (let i = 0; i < 16; i++) {
    const hasNote = randB(0.9);
    if (hasNote) {
      stepNotes[i] = getRandomNote(pitches);
      stepModifierFlags[i] = randB(0.5) ? 0 : randRangeI(1, 2);
    }
  }
  return { stepNotes, stepModifierFlags };
}
