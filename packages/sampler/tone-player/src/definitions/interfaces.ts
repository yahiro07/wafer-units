import { CommonParameters, SlotParameters } from "@/definitions/definitions";

// export type AudioSourceSpec = {
//   baseUrl: string;
//   audioPaths: string[];
// };

export type AudioFetcher = {
  fetchAudioBufferCached(uri: string): Promise<AudioBuffer>;
};

export type SamplerEngine = {
  // setSourceSpec(sourceSpec: AudioSourceSpec): void;
  // setSlots(slots: SamplerSlot[]): void;
  // setCommonParameters(commonParameters: CommonParameters): void;
  setSlotAudio(slotIndex: number, uri: string): void;
  setSlotParameters(slotIndex: number, parameters: SlotParameters): void;
  trigger(slotIndex: number, skipIfNotLoaded?: boolean): void;
  cleanup(): void;
};

export type LevelsLoader = {
  loadLevels(uri: string): Promise<number[]>;
};

export type PreviewPlayer = {
  play(uri: string): void;
};

export type MasterMixer = {
  mainInputNode: AudioNode;
  auxInputNode: AudioNode;
  setCommonParameters(commonParameters: CommonParameters): void;
  cleanup(): void;
};
