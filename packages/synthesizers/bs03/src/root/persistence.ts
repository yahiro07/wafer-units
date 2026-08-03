import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      parameters.wave,
      unaryToByte(parameters.cutoff),
      unaryToByte(parameters.peak),
      unaryToByte(parameters.decay),
      unaryToByte(parameters.envMod),
      unaryToByte(parameters.glide),
      unaryToByte(parameters.accent),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 7) return;
    const wave = bytes[0];
    if (wave < 0 || wave > 1) return;
    const cutoff = unaryFromByte(bytes[1]);
    const peak = unaryFromByte(bytes[2]);
    const decay = unaryFromByte(bytes[3]);
    const envMod = unaryFromByte(bytes[4]);
    const glide = unaryFromByte(bytes[5]);
    const accent = unaryFromByte(bytes[6]);
    store.assign({
      parameters: {
        wave,
        cutoff,
        peak,
        decay,
        envMod,
        glide,
        accent,
      },
    });
  },
};
