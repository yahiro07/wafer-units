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
  onPlayStepPositionChanged(stepIndex: number): void;
};

export type ISequencer = {
  setState(attrs: Partial<SequencerEditState>): void;
  setListener(listener: ISequencerListener | null): void;
  start(): void;
  processStep(stepIndex: number, time: number, unitDuration: number): void;
  stop(): void;
  setPreviewTone(pitchIndex: number): void;
};
