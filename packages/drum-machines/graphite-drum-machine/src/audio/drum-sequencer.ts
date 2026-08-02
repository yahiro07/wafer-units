import { isBitSet } from "mofur/ax";
import { UnitInterface } from "wafer-host/unit-types";
import { createTonePlayer } from "@/audio/tone-player";
import { pieceSampleUrls } from "@/base/piece-sample-urls";
import { PieceItem } from "@/base/type";

export type DrumSequencer = {
  preloadFirst(): void;
  patchPiece(id: string, attrs: Partial<PieceItem>): void;
  start(): void;
  stop(): void;
  processStep(stepIndex: number, time: number): void;
  previewPiece(id: string): void;
  setMasterVolume(value: number): void;
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
    preloadFirst() {
      for (const piece of state.pieces) {
        if (piece.active && piece.patternBits > 0) {
          void tonePlayer.preloadTone(
            pieceSampleUrls[piece.id][piece.variationIndex],
          );
        }
      }
    },
    patchPiece(id: string, attrs: Partial<PieceItem>) {
      const piece = state.pieces.find((piece) => piece.id === id);
      if (piece) {
        Object.assign(piece, attrs);
        void tonePlayer.preloadTone(
          pieceSampleUrls[piece.id][piece.variationIndex],
        );
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
            tonePlayer.playTone(uri, time, piece.pitch, piece.volume, piece.id);
          }
        }
      }
    },
    async previewPiece(id: string) {
      const piece = state.pieces.find((piece) => piece.id === id);
      if (piece) {
        await tonePlayer.preloadTone(
          pieceSampleUrls[piece.id][piece.variationIndex],
        );
        const uri = pieceSampleUrls[piece.id][piece.variationIndex];
        tonePlayer.playTone(uri, 0, piece.pitch, piece.volume, piece.id);
      }
    },
    setMasterVolume(value: number) {
      tonePlayer.setMasterVolume(value);
    },
  };
}
