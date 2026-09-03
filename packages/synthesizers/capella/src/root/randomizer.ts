import {
  allOsc1Ratios,
  allOscWaveTypes,
  SynthParameters,
} from "@/defs/definitions";

const randF = Math.random;

function randI(max: number) {
  return Math.floor(randF() * max);
}

function randRange(min: number, max: number) {
  return min + randF() * (max - min);
}

function probably<T>(p: number, a: T, b: T) {
  return randF() < p ? a : b;
}

function randB(p: number) {
  return randF() < p;
}

function randChoice<T>(options: T[]): T {
  return options[randI(options.length)];
}

export function createRandomParameters(): Partial<SynthParameters> {
  return {
    osc1Wave: probably(0.35, "sine", randChoice(allOscWaveTypes)),
    osc1Octave: probably(0.6, 0, randChoice([-2, -1, 1, 2])),
    osc1Ratio: randChoice(allOsc1Ratios),
    osc1Decay: randRange(0.1, 1),
    osc2Wave: probably(0.35, "sine", randChoice(allOscWaveTypes)),
    osc2ModAltMix: randB(0.25),
    osc2Mod: randRange(0.1, 1),
    osc2Decay: randRange(0.1, 1),
    ampRelease: probably(0.35, 0, randF()),
    chorusLevel: probably(0.45, 0, randF()),
    chorusAltReverb: randB(0.5),
    patchOctave: randB(0.3) ? -1 : 0,
    patchVolume: 0.5,
  };
}
