export type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

export const allSongKeys: SongKey[] = ["Am", "B", "C", "Dm", "Em", "F", "G"];

export type DynamicPatternInput = {
  key?: SongKey; //"C", "Am", etc.
  chordRootNote?: number; //in midi note number
};

export type ProgressionState = {
  key: SongKey;
  loopBars: number;
  relatives: number[];
};
