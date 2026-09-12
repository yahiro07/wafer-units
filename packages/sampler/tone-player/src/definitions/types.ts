export type SamplerSlot = {
  audioIndex: number;
  volume: number;
  pan: number;
  aux: number;
};

export type CommonParameters = {
  mainLevel: number;
  auxLevel: number;
};

export type StoreState = {
  slots: SamplerSlot[];
  levelsMap: Record<number, number[]>; //assetIndex-->levels
  audioSourceText: string;
  commonParameters: CommonParameters;
  errorMessage: string | null;
};

export type AudioSourceSpec = {
  baseUrl: string;
  audioPaths: string[];
};

export type SamplerEngine = {
  setSourceSpec(sourceSpec: AudioSourceSpec): void;
  setSlots(slots: SamplerSlot[]): void;
  setCommonParameters(commonParameters: CommonParameters): void;
  loadLevels(uri: string): Promise<number[]>;
  trigger(audioIndex: number, skipIfNotLoaded?: boolean): void;
  cleanup(): void;
};
