import {
  numOscWaveTypes,
  OscWave,
  SynthPresetParameters,
} from "@/defs/definitions";

const randF = Math.random;

function randI(max: number) {
  return Math.floor(randF() * max);
}

function randRange(min: number, max: number) {
  return min + randF() * (max - min);
}

function randRangeI(min: number, max: number) {
  return Math.round(randF() * (max - min) + min);
}

function probably(p: number, a: number, b: number) {
  return randF() < p ? a : b;
}

function randB(p: number) {
  return randF() < p;
}

export function createRandomParameters(): SynthPresetParameters {
  return {
    voiceOctave: randRangeI(-1, 1),
    osc1Wave: probably(0.3, OscWave.Ex, randI(numOscWaveTypes)),
    oscDetune: randRange(0, 0.7),
    osc2Wave: randI(numOscWaveTypes),
    osc2Octave: randRangeI(-2, 2),
    osc2Volume: probably(0.7, 1, 0),
    hpfCutoff: probably(0.4, 0, randRange(0, 0.8)),
    hpfQ: randF(),
    lpfCutoff: probably(0.4, 1, randRange(0.1, 1)),
    lpfQ: randF(),
    lpfEnvMod: probably(0.4, 0, randF()),
    lpfSteep: randB(0.5),
    attackAltPunch: randB(0.5),
    ampAttack: probably(0.4, 0, randF()),
    ampDecay: probably(0.4, 0, randF()),
    ampSustain: randF(),
    ampRelease: probably(0.4, 0, randF()),
    density: probably(0.7, 0, randF()),
    pitchLfoAltPitchEg: randB(0.2),
    pitchLfoRate: randF(),
    pitchLfoDepth: probably(0.7, 0, randF()),
    filterLfoRate: randF(),
    filterLfoDepth: probably(0.7, 0, randF()),
    reverbDecay: randF(),
    reverbMix: probably(0.4, 0, randRange(0, 0.7)),
    reverbDamp: randF(),
    chorusLevel: probably(0.4, 0, randF()),
    presence: probably(0.4, 0, randF()),
    globalVolume: 0.5,
  };
}
