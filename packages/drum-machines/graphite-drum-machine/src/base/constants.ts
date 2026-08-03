import { PieceId } from "@/base/type";

export const pieceIds: PieceId[] = ["kick", "snare", "opHat", "clHat", "clap"];

export const pieceDisplayNames: Record<PieceId, string> = {
  kick: "KICK",
  snare: "SNARE",
  opHat: "OP-HIHAT",
  clHat: "CL-HIHAT",
  clap: "CLAP",
};
