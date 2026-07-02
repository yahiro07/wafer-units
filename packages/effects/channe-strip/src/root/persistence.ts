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
      parameters.outputOn ? 1 : 0,
      parameters.effectOn ? 1 : 0,
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
    if (bytes.length !== 10) return;
    const outputOn = bytes[0] !== 0;
    const effectOn = bytes[1] !== 0;
    const volume = unaryFromByte(bytes[2]);
    const pan = unaryFromByte(bytes[3]) * 2 - 1;
    const haas = unaryFromByte(bytes[4]);
    const lowCut = unaryFromByte(bytes[5]);
    const eqLow = unaryFromByte(bytes[6]);
    const eqMid = unaryFromByte(bytes[7]);
    const eqHigh = unaryFromByte(bytes[8]);
    const compress = unaryFromByte(bytes[9]);
    store.assign({
      parameters: {
        outputOn: outputOn,
        effectOn: effectOn,
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
