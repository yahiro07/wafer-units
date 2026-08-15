import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { octave, duty, stepBits } = store.state;
    const bytes = new Uint8Array([
      octave + 100,
      (duty * 255) >>> 0,
      ...stepBits.flatMap((stepBit) => [(stepBit >> 8) & 0xff, stepBit & 0xff]),
    ]);
    return bytes;
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length !== 18) return;
    const octave = bytes[0] - 100;
    const duty = bytes[1] / 255;
    const stepBits = seqNumbers(8).map((i) => {
      const offset = 2 + i * 2;
      return (bytes[offset] << 8) | bytes[offset + 1];
    });
    store.assign({ octave, duty, stepBits });
  },
};
