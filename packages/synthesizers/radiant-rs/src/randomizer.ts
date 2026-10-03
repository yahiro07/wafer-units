import {
  AmpParameters,
  EqParameters,
  FilterParameters,
  MiscParameters,
  OscParameters,
  ReverbParameters,
  SynthParameters,
} from "./core/definitions";
import { numWaveformSpecs } from "./core/waveforms/core-waveform-generator";

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

function _probably(p: number, a: number, b: number) {
  return randF() < p ? a : b;
}

function randB(p = 0.5) {
  return randF() < p;
}

const randomizer = {
  osc(): OscParameters {
    return {
      enabled: randB(0.75),
      octave: randRangeI(-1, 1),
      wave: randRangeI(0, numWaveformSpecs - 1),
      shape: randF(),
      dense: randF(),
      mix: randF(),
      unison: randRangeI(1, 7),
      detune: randRange(0, 0.7),
      pan: randRange(-0.5, 0.5),
      volume: randRange(0.33, 0.66),
      phaseRandom: randB(),
      spread: randB(),
      sub: randB(),
      full: randB(),
    };
  },
  filter(): FilterParameters {
    return {
      enabled: true,
      type: 0,
      cutoff: randRange(0.2, 1),
      peak: randF(),
      env: randF(),
      envRelease: false,
    };
  },
  amp(): AmpParameters {
    return {
      enabled: true,
      attack: randRange(0, 0.6),
      decay: randF(),
      sustain: randF(),
      release: randF(),
    };
  },
  eq(): EqParameters {
    return {
      enabled: true,
      tilt: randRange(0.3, 1),
      freq: randF(),
    };
  },
  reverb(): ReverbParameters {
    return {
      enabled: randB(),
      time: randRange(0, 0.7),
      tone: randF(),
      mix: randF(),
    };
  },
  misc(): MiscParameters {
    return {
      patchVolume: 0.5,
    };
  },
};

export function createRandomParameters(): SynthParameters {
  const res: SynthParameters = {
    osc1: randomizer.osc(),
    osc2: randomizer.osc(),
    osc3: randomizer.osc(),
    filter: randomizer.filter(),
    amp: randomizer.amp(),
    eq: randomizer.eq(),
    reverb: randomizer.reverb(),
    misc: randomizer.misc(),
  };
  if (!res.osc1.enabled && !res.osc2.enabled && !res.osc3.enabled) {
    res.osc1.enabled = true;
  }
  return res;
}
