export type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

export type SongKeyMetaAttrs = {
  songKey?: SongKey; //"C", "Am", etc.
};

export type Note = {
  id: string;
  relNoteNumber: number;
  position: number;
  duration: number;
  lane: number;
};

export type DraftNote = Note & {
  pointerId: number;
};
