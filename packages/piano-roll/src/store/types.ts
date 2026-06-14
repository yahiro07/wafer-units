export type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

export type DynamicPatternInput = {
  key?: SongKey; //"C", "Am", etc.
  chordRootNote?: number; //in midi note number
};
export type DynamicPatternMeta = {
  dynamicPatternInput?: DynamicPatternInput;
};

export type Note = {
  relativeNoteNumber: number;
  stepPosition: number;
  stepDuration: number;
};

export type DraftNote = {
  pointerId: number;
  relativeNoteNumber: number;
  stepPosition: number;
  stepDuration: number;
};
