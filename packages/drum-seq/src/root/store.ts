import { createStore } from "snap-store";
import { defaultPieces } from "@/root/constants";
import { createDrumSequencer } from "@/root/durm-sequencer";
import { PieceItem } from "@/root/type";

type StorState = {
  pieces: PieceItem[];
  stepPosition: number;
};

export const store = createStore<StorState>({
  pieces: defaultPieces,
  stepPosition: -1,
});
const sequencer = createDrumSequencer(defaultPieces);

export const actions = {
  patchPiece(id: string, attrs: Partial<PieceItem>) {
    sequencer.patchPiece(id, attrs);
    store.setPieces((prev) =>
      prev.map((piece) => (piece.id === id ? { ...piece, ...attrs } : piece)),
    );
  },
};
