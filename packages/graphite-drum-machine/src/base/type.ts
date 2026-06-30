export type PieceId = "kick" | "snare" | "opHat" | "clHat" | "clap";

export type PieceItem = {
  id: PieceId;
  variationIndex: number;
  active: boolean;
  pitch: number;
  volume: number;
  patternBits: number;
};

export type Preset = {
  pieceItems: PieceItem[];
};
