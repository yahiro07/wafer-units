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

function probably(p: number, a: number, b: number) {
  return randF() < p ? a : b;
}

function randB(p = 0.5) {
  return randF() < p;
}

const randomizer = {
  osc(): OscParameters {
    return {
      enabled: randB(0.75),
      octave: probably(0.6, 0, randRangeI(-1, 1)),
      wave: randRangeI(0, numWaveformSpecs - 1),
      shape: randF(),
      dense: randRange(0.3, 0.8),
      mix: randF(),
      unison: randRangeI(1, 7),
      detune: probably(0.8, randRange(0.3, 0.55), randRange(0.1, 0.7)),
      pan: probably(0.5, 0, randRange(-0.5, 0.5)),
      volume: randRange(0.3, 0.55),
      phaseRandom: randB(0.8),
      spread: randB(0.75),
      sub: randB(0.2),
      full: randB(0.7),
    };
  },
  filter(): FilterParameters {
    return {
      enabled: true,
      type: 0,
      cutoff: probably(0.8, randRange(0.8, 1), randRange(0.35, 1)),
      peak: randRange(0, 0.8),
      env: randF(),
      envRelease: false,
    };
  },
  amp(): AmpParameters {
    return {
      enabled: true,
      attack: probably(0.75, 0, randRange(0, 0.7)),
      decay: randF(),
      sustain: randF(),
      release: probably(0.7, randRange(0, 0.5), randF()),
    };
  },
  eq(): EqParameters {
    return {
      enabled: true,
      tilt: probably(0.8, randRange(0.5, 0.8), randRange(0.3, 1)),
      freq: randRange(0.3, 0.7),
    };
  },
  reverb(): ReverbParameters {
    return {
      enabled: randB(),
      time: randRange(0, 0.7),
      tone: randRange(0.2, 0.8),
      mix: randRange(0, 0.7),
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
  const onCount = [res.osc1.enabled, res.osc2.enabled, res.osc3.enabled].filter(
    Boolean,
  ).length;
  if (onCount === 0) {
    res.osc1.enabled = true;
  } else if (onCount === 1) {
    if (res.osc3.enabled) {
      res.osc1.enabled = true;
    } else {
      res.osc1.enabled = true;
      res.osc2.enabled = true;
    }
  }
  return res;
}
