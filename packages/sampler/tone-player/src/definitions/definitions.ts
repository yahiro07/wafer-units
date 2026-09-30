export type SlotParameters = {
  volume: number;
  speed: number;
  pan: number;
  drive: number;
  eq: number;
  aux: number;
};

export type SamplerSlot = {
  audioIndex: number;
  parameters: SlotParameters;
};

export type CommonParameters = {
  mainLevel: number;
  auxLevel: number;
  reverbOn: boolean;
  reverbTime: number;
  reverbTone: number;
  reverbMix: number;
};
