export type OscParameters = {
  enabled: boolean;
  octave: number;
  wave: number;
  shape: number;
  dense: number;
  mix: number;
  unison: number;
  detune: number;
  pan: number;
  volume: number;
  phaseRandom: boolean;
  spread: boolean;
  sub: boolean;
  full: boolean;
};
export type OscParameterKey = keyof OscParameters;

export type FilterParameters = {
  enabled: boolean;
  cutoff: number;
  peak: number;
  env: number;
};

export type AmpParameters = {
  enabled: boolean;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type EqParameters = {
  enabled: boolean;
  tilt: number;
  freq: number;
};

export type ReverbParameters = {
  enabled: boolean;
  time: number;
  tone: number;
  mix: number;
};

export type SynthParameters = {
  osc1: OscParameters;
  osc2: OscParameters;
  osc3: OscParameters;
  filter: FilterParameters;
  amp: AmpParameters;
  eq: EqParameters;
  reverb: ReverbParameters;
};
export type SynthParameterKey = keyof SynthParameters;

export type OscId = "osc1" | "osc2" | "osc3";

export const defaultSynthParameters: SynthParameters = {
  osc1: {
    enabled: true,
    octave: 0,
    wave: 0,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
    phaseRandom: true,
    spread: true,
    sub: false,
    full: true,
  },
  osc2: {
    enabled: false,
    octave: 0,
    wave: 1,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
    phaseRandom: true,
    spread: true,
    sub: false,
    full: true,
  },
  osc3: {
    enabled: false,
    octave: 0,
    wave: 0,
    shape: 0,
    dense: 0.5,
    mix: 1,
    unison: 7,
    detune: 0.5,
    pan: 0,
    volume: 0.5,
    phaseRandom: true,
    spread: true,
    sub: false,
    full: true,
  },
  filter: {
    enabled: true,
    cutoff: 1,
    peak: 0,
    env: 0,
  },
  amp: {
    enabled: true,
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
  },
  eq: {
    enabled: true,
    tilt: 0.5,
    freq: 0.5,
  },
  reverb: {
    enabled: false,
    time: 0.5,
    tone: 0.5,
    // mix: 0.5,
    mix: 0,
  },
};

export type ParameterEditSpec = {
  osc1?: Partial<OscParameters>;
  osc2?: Partial<OscParameters>;
  osc3?: Partial<OscParameters>;
  filter?: Partial<FilterParameters>;
  amp?: Partial<AmpParameters>;
  eq?: Partial<EqParameters>;
  reverb?: Partial<ReverbParameters>;
};

export type SynthesizerEngine = {
  applyParameters(spec: ParameterEditSpec): void;
  noteOn(noteNumber: number): void;
  noteOff(noteNumber: number): void;
  cleanup(): void;
};
