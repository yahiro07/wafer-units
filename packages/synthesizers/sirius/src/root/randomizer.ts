import { oscWaveTypesForUi, SynthParameters } from "@/defs/definitions";

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

function randChoice<T>(options: T[]): T {
  return options[randI(options.length)];
}

export function createRandomParameters(): Partial<SynthParameters> {
  return {
    oscWave: probably(0.2, 0, randChoice(oscWaveTypesForUi)),
    oscDetune: probably(0.4, 0, randF()),
    oscSub: probably(0.4, 0, randF()),
    oscDrift: probably(0.6, 0, randF()),
    filterCutoff: probably(0.3, 1, randRange(0.2, 1)),
    filterPeak: probably(0.3, 0, randF()),
    filterDecay: probably(0.4, 0, randF()),
    ampDecay: probably(0.25, 1, randRange(0.1, 1)),
    ampRelease: probably(0.3, 0, randF()),
    fxChorus: probably(0.4, 0, randF()),
    fxReverb: probably(0.4, 0, randF()),
    patchVolume: 0.5,
  };
}
