export type ISynthesizerBase = {
  noteOn(noteNumber: number, velocity?: number): void;
  noteOff(noteNumber: number): void;
};

export type IKeyHoldEvent = {
  noteNumber: number;
  hold: boolean;
};

export type INumberDirection = -1 | 1;

export type IPcKeyboardRootNoteGetter = {
  getRootNoteNumber(): number;
};

export type ILanguageKey = 'en' | 'ja';

export type ISampleLoopingMethod = 'SL' | 'XF';
