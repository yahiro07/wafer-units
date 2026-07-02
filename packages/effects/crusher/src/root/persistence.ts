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
      unaryToByte(parameters.age),
      unaryToByte(parameters.grit),
      unaryToByte(parameters.degrade),
      parameters.saturationMode,
      unaryToByte(parameters.toneColor),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 6) return;
    const isOn = bytes[0] !== 0;
    const age = unaryFromByte(bytes[1]);
    const grit = unaryFromByte(bytes[2]);
    const degrade = unaryFromByte(bytes[3]);
    const saturationMode = bytes[4];
    const toneColor = unaryFromByte(bytes[5]);
    store.assign({
      parameters: {
        isOn,
        age,
        grit,
        degrade,
        saturationMode,
        toneColor,
      },
    });
  },
};
