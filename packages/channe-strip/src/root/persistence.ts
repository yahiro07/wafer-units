import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";

function unaryToByte(value: number): number {
  return (value * 255) >>> 0;
}

function unaryFromByte(byte: number): number {
  return byte / 255;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.isOn ? 1 : 0,
      unaryToByte(parameters.volume),
      unaryToByte((parameters.pan + 1) / 2),
      unaryToByte(parameters.haas),
      unaryToByte(parameters.lowCut),
      unaryToByte(parameters.eqLow),
      unaryToByte(parameters.eqMid),
      unaryToByte(parameters.eqHigh),
      unaryToByte(parameters.compress),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 9) return;
    const isOn = bytes[0] !== 0;
    const volume = unaryFromByte(bytes[1]);
    const pan = unaryFromByte(bytes[2] * 2 - 1);
    const haas = unaryFromByte(bytes[3]);
    const lowCut = unaryFromByte(bytes[4]);
    const eqLow = unaryFromByte(bytes[5]);
    const eqMid = unaryFromByte(bytes[6]);
    const eqHigh = unaryFromByte(bytes[7]);
    const compress = unaryFromByte(bytes[8]);
    store.assign({
      parameters: {
        isOn,
        volume,
        pan,
        haas,
        lowCut,
        eqLow,
        eqMid,
        eqHigh,
        compress,
      },
    });
  },
};
