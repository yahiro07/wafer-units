import { PieceId, PieceItem } from "@/root/type";

const pieceIds: PieceId[] = ["kick", "snare", "opHat", "clHat", "clap"];

export const pieceSampleUrls: Record<PieceId, string[]> = {
  kick: ["samples/bd-01.wav", "samples/bd-05.wav"],
  snare: ["samples/hsnare-03.wav"],
  opHat: ["samples/ho-01.wav"],
  clHat: ["samples/hc-03.wav"],
  clap: ["samples/pc-02.wav"],
};

export const defaultPieces: PieceItem[] = pieceIds.map((id) => ({
  id,
  variationIndex: 0,
  active: true,
  pitch: 0.5,
  volume: 0.5,
  patternBits: 0,
}));

export const pieceDisplayNames: Record<PieceId, string> = {
  kick: "KICK",
  snare: "SNARE",
  opHat: "OP-HIHAT",
  clHat: "CL-HIHAT",
  clap: "CLAP",
};
