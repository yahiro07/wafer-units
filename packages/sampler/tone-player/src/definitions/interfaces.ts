import { SamplerSlot, CommonParameters } from "@/definitions/types";

export type AudioSourceSpec = {
  baseUrl: string;
  audioPaths: string[];
};

export type SamplerEngine = {
  setSourceSpec(sourceSpec: AudioSourceSpec): void;
  setSlots(slots: SamplerSlot[]): void;
  setCommonParameters(commonParameters: CommonParameters): void;
  trigger(audioIndex: number, skipIfNotLoaded?: boolean): void;
  cleanup(): void;
};

export type AudioFetcher = {
  fetchAudioBufferCached(uri: string): Promise<AudioBuffer>;
};
