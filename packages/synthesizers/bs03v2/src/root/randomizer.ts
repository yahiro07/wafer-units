import { SynthPresetParameters } from "@/defs/definitions";
import { fillNumbers } from "@/utils/helpers";

const randF = () => Math.random();

const randB = (p: number) => Math.random() < p;

const randI = (n: number) => Math.floor(Math.random() * n);

const randRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export function generateRandomParameters(): SynthPresetParameters {
  return {
    oscWave: randI(2),
    filterCutoff: randF(),
    filterPeak: randF(),
    filterEnvMod: randF(),
    ampDecay: randF(),
    patchVolume: 0.5,
    drive: randF(),
  };
}

export function generateRandomStepPattern(pitchPreset: number[]) {
  const stepNotes = fillNumbers(16, -1);
  const stepModifierFlags = fillNumbers(16, 0);
  for (let i = 0; i < 16; i++) {
    const hasNote = randB(0.9);
    if (hasNote) {
      const ri = randI(pitchPreset.length);
      stepNotes[i] = pitchPreset[ri];
      stepModifierFlags[i] = randI(3);
    }
  }
  return { stepNotes, stepModifierFlags };
}
