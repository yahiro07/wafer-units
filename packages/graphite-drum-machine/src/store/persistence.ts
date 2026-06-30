import { seqNumbers } from "mofur/ax";
import { Persistence } from "wafer-host/unit-types";
import { pieceIds } from "@/base/constants";
import { AppStore } from "@/store/store";

function unaryParameterToByte(value: number): number {
  return (value * 255) >>> 0;
}
function unaryParameterFromByte(byte: number): number {
  return byte / 255;
}

export function createPersistence(store: AppStore): Persistence {
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
          piece.patternBits,
        ]),
      ]);
    },
    applyStateBytes(allBytes: Uint8Array) {
      const numPieces = pieceIds.length;
      if (allBytes.length !== 6 * numPieces + 1) return;
      const masterVolume = unaryParameterFromByte(allBytes[0]);
      const pieceItems = seqNumbers(numPieces).map((index) => {
        const bytes = allBytes.slice(1 + index * 6, 1 + (index + 1) * 6);
        return {
          id: pieceIds[bytes[0]],
          variationIndex: bytes[1],
          active: bytes[2] !== 0,
          volume: unaryParameterFromByte(bytes[3]),
          pitch: unaryParameterFromByte(bytes[4]),
          patternBits: bytes[5],
        };
      });
      const valid = pieceItems.every(
        (piece, index) => piece.id === pieceIds[index],
      );
      if (valid) {
        store.setPieces(pieceItems);
        store.setMasterVolume(masterVolume);
      }
    },
  };
}
