import { numWaveModes, SynthParameters } from "@/defs/definitions";

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

function randB(p: number) {
  return randF() < p;
}

export function createRandomParameters(): Partial<SynthParameters> {
  const fixDR = randB(0.5) ? "D" : "R";
  return {
    waveMode: randI(numWaveModes),
    shape: randF(),
    envRange: randI(2),
    envDecay: randF(),
    detune: probably(0.5, 0, randF()),
    sub: randB(0.5),
    decay: probably(fixDR === "D" ? 0.3 : 0, 1, randF()),
    release: probably(fixDR === "R" ? 0.3 : 0, 0, randF()),
    drift: probably(0.5, 0, randF()),
    loFi: probably(0.6, 0, randRange(0, 0.6)),
    chorus: probably(0.5, 0, randF()),
    delay: probably(0.5, 0, randF()),
    reverb: probably(0.5, 0, randRange(0, 0.7)),
  };
}
