export type OscWave = 0 | 1 | 2 | 3;

export const waveNames: Record<OscWave, string> = {
  0: "Saw",
  1: "Sqr",
  2: "Tri",
  3: "Sin",
};

export interface SynthParams {
  oscWave: OscWave;
  oscDetune: number;
  subLevel: number;
  drift: number;
  chorus: number;
  reverb: number;
  filterCutoff: number;
  filterPeak: number;
  filterEnvMod: number;
  ampDecay: number;
  ampRelease: number;
  masterVolume: number;
}

export const defaultParams: SynthParams = {
  oscWave: 0,
  oscDetune: 0,
  subLevel: 0,
  drift: 0,
  chorus: 0,
  reverb: 0,
  filterCutoff: 1,
  filterPeak: 0,
  filterEnvMod: 0,
  ampDecay: 1,
  ampRelease: 0,
  masterVolume: 0.8,
};

export const presetNames = [
  "Init",
  "Bass1",
  "Bass2",
  "Lead1",
  "Lead2",
  "Pad1",
  "Pad2",
] as const;

export type PresetName = (typeof presetNames)[number];

export const presets: Record<PresetName, SynthParams> = {
  Init: { ...defaultParams },
  Bass1: {
    oscWave: 0,
    oscDetune: 0.15,
    subLevel: 0.3,
    drift: 0.2,
    chorus: 0,
    reverb: 0,
    filterCutoff: 0.63,
    filterPeak: 0.5,
    filterEnvMod: 0.79,
    ampDecay: 0.55,
    ampRelease: 0.1,
    masterVolume: 0.8,
  },
  Bass2: {
    oscWave: 1,
    oscDetune: 0,
    subLevel: 0.5,
    drift: 0.1,
    chorus: 0,
    reverb: 0.1,
    filterCutoff: 0.4,
    filterPeak: 0.3,
    filterEnvMod: 0.4,
    ampDecay: 0.66,
    ampRelease: 0.15,
    masterVolume: 0.8,
  },
  Lead1: {
    oscWave: 0,
    oscDetune: 0.25,
    subLevel: 0,
    drift: 0.3,
    chorus: 0.35,
    reverb: 0.2,
    filterCutoff: 0.7,
    filterPeak: 0.4,
    filterEnvMod: 0.5,
    ampDecay: 0.6,
    ampRelease: 0.3,
    masterVolume: 0.75,
  },
  Lead2: {
    oscWave: 1,
    oscDetune: 0,
    subLevel: 0.2,
    drift: 0.1,
    chorus: 0.2,
    reverb: 0.1,
    filterCutoff: 0.75,
    filterPeak: 0.55,
    filterEnvMod: 0.35,
    ampDecay: 0.55,
    ampRelease: 0.2,
    masterVolume: 0.75,
  },
  Pad1: {
    oscWave: 0,
    oscDetune: 0.4,
    subLevel: 0.2,
    drift: 0.4,
    chorus: 0.65,
    reverb: 0.7,
    filterCutoff: 0.5,
    filterPeak: 0.15,
    filterEnvMod: 0.1,
    ampDecay: 1,
    ampRelease: 0.7,
    masterVolume: 0.7,
  },
  Pad2: {
    oscWave: 2,
    oscDetune: 0.3,
    subLevel: 0.45,
    drift: 0.5,
    chorus: 0.5,
    reverb: 0.8,
    filterCutoff: 0.4,
    filterPeak: 0.1,
    filterEnvMod: 0.2,
    ampDecay: 1,
    ampRelease: 0.8,
    masterVolume: 0.7,
  },
};
