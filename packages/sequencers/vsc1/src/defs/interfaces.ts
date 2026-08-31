import { SequencerEditState } from "@/defs/definitions";
import { SongKeySpec } from "wafer-host/unit-types";

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
  setKey(keySpec: SongKeySpec): void;
  setListener(listener: ISequencerListener | null): void;
  start(): void;
  processStep(stepIndex: number, time: number, unitDuration: number): void;
  stop(): void;
  setPreviewTone(pitchIndex: number): void;
};
