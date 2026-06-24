import { DrumSequencer } from "@/audio/drum-sequencer";
import { PieceItem } from "@/base/type";
import { AppStore } from "@/store/store";

export type Actions = {
  patchPiece(id: string, attrs: Partial<PieceItem>): void;
  start(): void;
  processStep(stepIndex: number, time: number): void;
  stop(): void;
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
  };
}
