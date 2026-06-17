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
  pitch: number;
  position: number;
  duration: number;
};

export type DraftNote = Note;

export type PatternMode = "simple";
