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

export const defaultSlotParameters: SlotParameters = {
  volume: 0.5,
  speed: 0.5,
  pan: 0,
  drive: 0,
  eq: 0.5,
  aux: 0,
};

export const defaultCommonParameters: CommonParameters = {
  mainLevel: 0.5,
  auxLevel: 0.5,
  reverbOn: false,
  reverbTime: 0.5,
  reverbTone: 0.5,
  reverbMix: 0.5,
};
