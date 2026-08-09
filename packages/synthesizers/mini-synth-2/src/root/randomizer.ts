import { SynthParameters } from "@/core/definitions";

const randF = Math.random;

function randI(max: number) {
  return Math.floor(randF() * max);
}

function randRange(min: number, max: number) {
  return min + randF() * (max - min);
}

function probably(p: number, a: number, b: number) {
  return randF() < p ? a : b;
}

export function createRandomParameters(): Partial<SynthParameters> {
  return {
    oscWave: randI(3),
    oscDetune: probably(0.5, 0, randRange(0, 0.5)),
    oscSub: probably(0.5, 0, randF()),
    oscDrift: probably(0.6, 0, randF()),
    filterCutoff: probably(0.4, 1, randRange(0.3, 1)),
    filterPeak: probably(0.4, 0, randF()),
    filterEnvMod: probably(0.3, 0, randF()),
    ampDecay: probably(0.3, 1, randRange(0.3, 0.9)),
    ampRelease: probably(0.4, 0, randF()),
    fxChorus: probably(0.6, 0, randRange(0, 0.6)),
    fxReverb: probably(0.6, 0, randRange(0, 0.6)),
  };
}
