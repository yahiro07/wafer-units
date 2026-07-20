import { Persistence } from "wafer-host/unit-types";
import { store } from "@/editor/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.isOn ? 1 : 0,
      unaryToByte(parameters.banded),
      unaryToByte(parameters.hi),
      unaryToByte(parameters.degrade),
      unaryToByte(parameters.drive),
      unaryToByte(parameters.noise),
      unaryToByte(parameters.wobble),
      unaryToByte(parameters.mix),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 8) return;
    const isOn = bytes[0] !== 0;
    const banded = unaryFromByte(bytes[1]);
    const hi = unaryFromByte(bytes[2]);
    const degrade = unaryFromByte(bytes[3]);
    const drive = unaryFromByte(bytes[4]);
    const noise = unaryFromByte(bytes[5]);
    const wobble = unaryFromByte(bytes[6]);
    const mix = unaryFromByte(bytes[7]);
    store.assign({
      parameters: {
        isOn,
        banded,
        hi,
        degrade,
        drive,
        noise,
        wobble,
        mix,
      },
    });
  },
};
