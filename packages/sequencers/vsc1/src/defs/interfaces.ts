import { SequencerEditState } from "@/defs/definitions";
import {
  SongKeySpec,
  ClockHandlers,
  NoteInputPort,
} from "wafer-host/unit-types";

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

// export type ISequencerListener = {
//   setPlayPosition(stepIndex: number): void;
// };

// export type ISequencer = {
//   patchEditState(attrs: Partial<SequencerEditState>): void;
//   setListener(listener: ISequencerListener): () => void;
//   start(): void;
//   step(stepIndex: number, time: number, unitDuration: number): void;
//   stop(): void;
//   cleanup(): void;
//   setKeyTranspose(keyTranspose: number): void;
// };

export type ISequencerListener = {
  onPlayStepPositionChanged(stepIndex: number): void;
};

export type ISequencer = {
  setState(attrs: Partial<SequencerEditState>): void;
  setKey(keySpec: SongKeySpec): void;
  clockHandlers: ClockHandlers;
  noteInput: NoteInputPort;
  setListener(listener: ISequencerListener): () => void;
};
