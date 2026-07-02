export type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

export const allSongKeys: SongKey[] = ["Am", "B", "C", "Dm", "Em", "F", "G"];

export type SongKeyMetaAttrs = {
  songKey?: SongKey; //"C", "Am", etc.
};

export type ProgressionState = {
  songKey: SongKey;
  loopBars: number;
  relatives: number[];
};
