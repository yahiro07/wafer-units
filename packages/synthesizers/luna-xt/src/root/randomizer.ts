import { numOscWaveTypes, SynthPresetParameters } from "@/defs/definitions";

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
    osc1Octave: randRangeI(-1, 1),
    osc1Wave: randI(numOscWaveTypes),
    osc1Unison: randRangeI(1, 5),
    osc1Spread: randB(0.7),
    osc1Detune: randRange(0.2, 0.7),
    osc1Sub: randB(0.5),
    osc1Mix: randI(3),
    //
    osc2Octave: randRangeI(-1, 1),
    osc2Wave: randI(numOscWaveTypes),
    osc2Unison: randRangeI(1, 5),
    osc2Spread: randB(0.7),
    osc2Detune: randRange(0.2, 0.7),
    osc2Sub: randB(0.5),
    osc2Mix: randI(3),
    //
    oscMix: randF(),
    ampDecayAltAttack: randB(0.5),
    ampDecay: randF(),
    ampRelease: randF(),
    //
    lpfCutoff: probably(0.3, 1, randRange(0.1, 1)),
    lpfPeak: randF(),
    lpfDecay: randRange(0, 1),
    //
    reverbTime: randF(),
    reverbTone: randF(),
    reverbMix: probably(0.3, 0, randRange(0, 0.7)),
    //
    density: probably(0.3, 0, randRange(0, 0.8)),
    patchVolume: 0.5,
  };
}
