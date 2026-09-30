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
  trigger(slotIndex: number): void;
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

export type SampleSourcePlayerTriggerOptions = {
  time?: number;
  speedRate?: number;
};

export type SampleSourcePlayer = {
  setAudio(uri: string): void;
  trigger(options?: SampleSourcePlayerTriggerOptions): void;
  cleanup(): void;
};

export type SlotEffectChain = {
  inputNode: AudioNode;
  setParameters(parameters: SlotParameters): void;
  cleanup(): void;
};

export type SlotPlayer = {
  setAudio(uri: string): void;
  trigger(): void;
  setParameters(parameters: SlotParameters): void;
  cleanup(): void;
};
