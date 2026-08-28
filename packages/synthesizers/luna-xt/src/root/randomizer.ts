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
  const res: SynthPresetParameters = {
    lane1On: true,
    lane1Volume: randRange(0.5, 1),
    lane2On: true,
    lane2Volume: randRange(0.3, 1),
    lane3On: true,
    lane3Volume: randRange(0.3, 1),
    //
    osc1Octave: randRangeI(-1, 1),
    osc1Wave: randI(numOscWaveTypes),
    osc1Unison: randRangeI(3, 5),
    osc1Spread: randB(0.8),
    osc1Detune: randRange(0.2, 0.9),
    osc1Sub: randB(0.4),
    osc1Mix: randRange(0.2, 1),
    //
    osc2Octave: randRangeI(-1, 1),
    osc2Wave: randI(numOscWaveTypes),
    osc2Unison: randRangeI(3, 5),
    osc2Spread: randB(0.8),
    osc2Detune: randRange(0.2, 0.9),
    osc2Sub: randB(0.4),
    osc2Mix: randRange(0.2, 1),
    //
    osc3Octave: randRangeI(-1, 1),
    osc3Wave: randI(numOscWaveTypes),
    osc3Unison: randRangeI(3, 5),
    osc3Spread: randB(0.8),
    osc3Detune: randRange(0.2, 0.9),
    osc3Sub: randB(0.4),
    osc3Mix: randRange(0.2, 1),
    //
    filter1Type: 0,
    filter1Cutoff: probably(0.5, 1, randRange(0.4, 1)),
    filter1Peak: randF(),
    filter1Env: randRange(0, 1),
    //
    filter2Type: 0,
    filter2Cutoff: probably(0.5, 1, randRange(0.4, 1)),
    filter2Peak: randF(),
    filter2Env: randRange(0, 1),
    //
    filter3Type: 0,
    filter3Cutoff: probably(0.5, 1, randRange(0.4, 1)),
    filter3Peak: randF(),
    filter3Env: randRange(0, 1),
    //
    amp1DecayAltAttack: randB(0.5),
    amp1Decay: randF(),
    amp1Release: randF(),
    //
    amp2DecayAltAttack: randB(0.5),
    amp2Decay: randF(),
    amp2Release: randF(),
    //
    amp3DecayAltAttack: randB(0.5),
    amp3Decay: randF(),
    amp3Release: randF(),
    //
    reverbTime: randF(),
    reverbTone: randF(),
    reverbMix: probably(0.3, 0, randRange(0, 0.7)),
    //
    density: probably(0.5, 0, randRange(0, 0.6)),
    patchVolume: 0.5,
    _oscAltWaveMix: false,
  };
  if (res.osc1Octave === 1 && res.osc2Octave === 1) {
    res.osc2Octave = 0;
  }
  if (res.osc1Octave === -1 && res.osc2Octave === -1) {
    res.osc1Octave = 0;
  }
  return res;
}
