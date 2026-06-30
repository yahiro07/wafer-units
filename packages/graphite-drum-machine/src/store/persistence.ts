import { seqNumbers } from "mofur/ax";
import { Persistence } from "wafer-host/unit-types";
import { DrumSequencer } from "@/audio/drum-sequencer";
import { pieceIds } from "@/base/constants";
import { AppStore } from "@/store/store";

function unaryParameterToByte(value: number): number {
  return (value * 255) >>> 0;
}
function unaryParameterFromByte(byte: number): number {
  return byte / 255;
}

export function createPersistence(
  store: AppStore,
  sequencer: DrumSequencer,
): Persistence {
  return {
    emitStateBytes(): Uint8Array {
      const { pieces, masterVolume } = store.state;
      return new Uint8Array([
        unaryParameterToByte(masterVolume),
        ...pieces.flatMap((piece) => [
          pieceIds.indexOf(piece.id),
          piece.variationIndex,
          piece.active ? 1 : 0,
          unaryParameterToByte(piece.volume),
          unaryParameterToByte(piece.pitch),
          (piece.patternBits >> 8) & 0xff,
          piece.patternBits & 0xff,
        ]),
      ]);
    },
    applyStateBytes(bytes: Uint8Array) {
      const numPieces = pieceIds.length;
      if (bytes.length !== 7 * numPieces + 1) return;
      const masterVolume = unaryParameterFromByte(bytes[0]);
      const pieceItems = seqNumbers(numPieces).map((index) => {
        const offset = 1 + index * 7;
        return {
          id: pieceIds[bytes[offset + 0]],
          variationIndex: bytes[offset + 1],
          active: bytes[offset + 2] !== 0,
          volume: unaryParameterFromByte(bytes[offset + 3]),
          pitch: unaryParameterFromByte(bytes[offset + 4]),
          patternBits: (bytes[offset + 5] << 8) | bytes[offset + 6],
        };
      });
      const valid = pieceItems.every(
        (piece, index) => piece.id === pieceIds[index],
      );
      if (valid) {
        store.setPieces(pieceItems);
        store.setMasterVolume(masterVolume);
        sequencer.setMasterVolume(masterVolume);
        for (const piece of pieceItems) {
          sequencer.patchPiece(piece.id, piece);
        }
      }
    },
  };
}
