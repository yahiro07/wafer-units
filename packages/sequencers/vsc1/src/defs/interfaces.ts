import { SequencerEditState } from "@/defs/definitions";

export type NoteModifierSpec = {
  slide: boolean;
  accent: boolean;
  unitDuration: number;
};

export type ISynthesizer = {
  noteOn(noteNumber: number, time?: number): void;
  noteOff(noteNumber: number, time?: number): void;
  cleanup(): void;
};

export type ISequencerListener = {
  setPlayPosition(stepIndex: number): void;
};

export type ISequencer = {
  patchEditState(attrs: Partial<SequencerEditState>): void;
  setListener(listener: ISequencerListener): () => void;
  start(): void;
  step(stepIndex: number, time: number, unitDuration: number): void;
  stop(): void;
  cleanup(): void;
  setKeyTranspose(keyTranspose: number): void;
};
