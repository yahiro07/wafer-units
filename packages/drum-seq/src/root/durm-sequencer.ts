import { PieceItem } from "@/root/type";

export function createDrumSequencer(defaultPieces: PieceItem[]) {
  const state = {
    pieces: defaultPieces,
  };
  return {
    patchPiece(id: string, attrs: Partial<PieceItem>) {},
  };
}
