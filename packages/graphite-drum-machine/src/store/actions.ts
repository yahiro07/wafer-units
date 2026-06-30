import { DrumSequencer } from "@/audio/drum-sequencer";
import { pieceSampleUrls } from "@/base/piece-sample-urls";
import { PresetKey, presets } from "@/base/presets";
import { PieceItem } from "@/base/type";
import { AppStore } from "@/store/store";

export type Actions = {
  patchPiece(id: string, attrs: Partial<PieceItem>): void;
  start(): void;
  processStep(stepIndex: number, time: number): void;
  stop(): void;
  previewPiece(id: string): void;
  resetPreset(): void;
  applyPreset(presetKey: PresetKey): void;
  randomizePieces(): void;
  setMasterVolume(value: number): void;
};

export function createActions(
  store: AppStore,
  sequencer: DrumSequencer,
): Actions {
  return {
    patchPiece(id: string, attrs: Partial<PieceItem>) {
      sequencer.patchPiece(id, attrs);
      store.setPieces((prev) =>
        prev.map((piece) => (piece.id === id ? { ...piece, ...attrs } : piece)),
      );
    },
    start() {
      sequencer.start();
      store.setStepPosition(0);
    },
    processStep(stepIndex: number, time: number) {
      sequencer.processStep(stepIndex % 16, time);
      store.setStepPosition(stepIndex % 16);
    },
    stop() {
      sequencer.stop();
      store.setStepPosition(-1);
    },
    previewPiece(id: string) {
      sequencer.previewPiece(id);
    },
    resetPreset() {
      const pieceItems = presets["init"].pieceItems;
      store.setPieces(pieceItems);
      for (const piece of pieceItems) {
        sequencer.patchPiece(piece.id, piece);
      }
    },
    applyPreset(presetKey: PresetKey) {
      const pieceItems = presets[presetKey].pieceItems;
      store.setPieces((prev) => {
        return prev.map((piece, index) => {
          const { variationIndex, ...attrs } = pieceItems[index];
          return { ...piece, ...attrs };
        });
      });
      for (const piece of pieceItems) {
        const { variationIndex, ...attrs } = piece;
        sequencer.patchPiece(piece.id, attrs);
      }
    },
    randomizePieces() {
      const pieceItems = store.state.pieces;
      const newVariationIndices = pieceItems.map((piece) =>
        Math.floor(Math.random() * pieceSampleUrls[piece.id].length),
      );
      store.setPieces(
        pieceItems.map((piece, index) => ({
          ...piece,
          variationIndex: newVariationIndices[index],
        })),
      );
      for (let i = 0; i < pieceItems.length; i++) {
        const piece = pieceItems[i];
        sequencer.patchPiece(piece.id, {
          variationIndex: newVariationIndices[i],
        });
      }
    },
    setMasterVolume(value: number) {
      sequencer.setMasterVolume(value);
      store.setMasterVolume(value);
    },
  };
}
