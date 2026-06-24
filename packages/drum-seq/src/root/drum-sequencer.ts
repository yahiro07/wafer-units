import { UnitInterface } from "wafer-host/unit-types";
import { isBitSet } from "@/common/bit-operation-helper";
import { pieceSampleUrls } from "@/root/constants";
import { createTonePlayer } from "@/root/tone-player";
import { PieceItem } from "@/root/type";

export type DrumSequencer = {
  patchPiece(id: string, attrs: Partial<PieceItem>): void;
  start(): void;
  stop(): void;
  processStep(stepIndex: number, time: number): void;
};

export function createDrumSequencer(
  unitInterface: UnitInterface | undefined,
  defaultPieces: PieceItem[],
): DrumSequencer {
  const tonePlayer = createTonePlayer(unitInterface);

  const state = {
    pieces: defaultPieces,
  };
  return {
    patchPiece(id: string, attrs: Partial<PieceItem>) {
      const piece = state.pieces.find((piece) => piece.id === id);
      if (piece) {
        Object.assign(piece, attrs);
      }
    },
    start() {},
    stop() {},
    processStep(stepIndex: number, time: number) {
      const step = stepIndex;
      for (const piece of state.pieces) {
        if (piece.active && isBitSet(piece.patternBits, step)) {
          const uri = pieceSampleUrls[piece.id][piece.variationIndex];
          if (uri) {
            tonePlayer.playTone(uri, time, piece.pitch, piece.volume);
          }
        }
      }
    },
  };
}
