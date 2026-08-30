import { SynthPresetParameters } from "@/defs/definitions";

const randF = Math.random;

function _randI(max: number) {
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
  const res: SynthPresetParameters = {
    osc1Octave: 0,
    osc1Unison: probably(0.4, 3, randRangeI(0, 2)),
    osc1Shape: randF(),
    osc1Spread: randB(0.8),
    osc1Detune: randRange(0.2, 0.7),
    osc1Sub: randB(0.4),
    osc1Mix: randRange(0.2, 1),
    //
    filter1Type: randRangeI(0, 1),
    filter1Cutoff: probably(0.5, 1, randRange(0.4, 1)),
    filter1Peak: randF(),
    filter1Env: randF(),
    filter1EnvRelease: randB(0.5),
    //
    amp1Full: randB(0.5),
    amp1Attack: probably(0.4, 0, randRange(0, 0.5)),
    amp1Decay: randF(),
    amp1Sustain: randF(),
    amp1Release: randF(),
    //
    reverbTime: randF(),
    reverbTone: randF(),
    reverbMix: probably(0.3, 0, randRange(0, 0.7)),
    //
    density: probably(0.5, 0, randRange(0, 0.6)),
    patchVolume: 0.5,
  };
  return res;
}
