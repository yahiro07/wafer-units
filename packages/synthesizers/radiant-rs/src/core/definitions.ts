import { appEnvs } from "../base/app-envs";

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

export enum FilterType {
  LP12 = 0,
  LP24,
}

export type FilterParameters = {
  enabled: boolean;
  type: FilterType;
  cutoff: number;
  peak: number;
  env: number;
  envRelease: boolean;
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

export type MiscParameters = {
  patchVolume: number;
};

export type SynthParameters = {
  osc1: OscParameters;
  osc2: OscParameters;
  osc3: OscParameters;
  filter: FilterParameters;
  amp: AmpParameters;
  eq: EqParameters;
  reverb: ReverbParameters;
  misc: MiscParameters;
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
    mix: 0.66,
    unison: 1,
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
    mix: 0.66,
    unison: 1,
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
    wave: 2,
    shape: 0,
    dense: 0.5,
    mix: 0.66,
    unison: 1,
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
    type: FilterType.LP12,
    cutoff: 1,
    peak: 0,
    env: 0,
    envRelease: false,
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
    mix: 0.5,
  },
  misc: {
    patchVolume: 0.5,
  },
};
if (appEnvs.isDevelopment) {
  const ds = defaultSynthParameters;
  ds.reverb.mix = 0;
  ds.osc1.unison = 7;
  ds.osc2.unison = 7;
  ds.osc3.unison = 7;
}

export type ParameterEditSpec = {
  osc1?: Partial<OscParameters>;
  osc2?: Partial<OscParameters>;
  osc3?: Partial<OscParameters>;
  filter?: Partial<FilterParameters>;
  amp?: Partial<AmpParameters>;
  eq?: Partial<EqParameters>;
  reverb?: Partial<ReverbParameters>;
  misc?: Partial<MiscParameters>;
};

export type SynthesizerEngine = {
  applyParameters(spec: ParameterEditSpec): void;
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  cleanup(): void;
};

export type SynthesisBus = {
  audioContext: AudioContext;
  latestParameters: SynthParameters;
};

export type IEditParametersReceiver = {
  dispatchParameterEdit(spec: ParameterEditSpec): void;
};
