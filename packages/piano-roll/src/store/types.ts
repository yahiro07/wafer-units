export type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

export type DynamicPatternInput = {
  key?: SongKey; //"C", "Am", etc.
  chordRootNote?: number; //in midi note number
};
export type DynamicPatternMeta = {
  dynamicPatternInput?: DynamicPatternInput;
};

export type Note = {
  id: number;
  relativeNoteNumber: number;
  stepPosition: number;
  stepDuration: number;
};

export type DraftNote = {
  id: number;
  // pointerId: number;
  relativeNoteNumber: number;
  stepPosition: number;
  stepDuration: number;
};
