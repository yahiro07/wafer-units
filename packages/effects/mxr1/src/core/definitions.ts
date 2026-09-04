export type EffectParameters = {
  ch1Pan: number;
  ch1FilterFreq: number;
  ch1FilterQ: number;
  ch1EqTilt: number;
  ch1EqFreq: number;
  ch1LevelMain: number;
  ch1LevelAux: number;
  mainGain: number;
  auxGain: number;
};

export const defaultEffectParameters: EffectParameters = {
  ch1Pan: 0,
  ch1FilterFreq: 0.5,
  ch1FilterQ: 0,
  ch1EqTilt: 0.5,
  ch1EqFreq: 0.5,
  ch1LevelMain: 0.5,
  ch1LevelAux: 0.5,
  mainGain: 0.5,
  auxGain: 0.5,
};

export type ChannelParameters = {
  pan: number;
  filterFreq: number;
  filterQ: number;
  eqTilt: number;
  eqFreq: number;
  levelMain: number;
  levelAux: number;
};

export type EffectEngine = {
  setParameters(parameters: EffectParameters): void;
  cleanup(): void;
};

export type ChannelId = "ch1";
