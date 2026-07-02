import { seqNumbers } from "mofur/ax";
import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { octave, duty, stepBits } = store.state;
    return new Uint8Array([
      octave + 100,
      (duty * 255) >>> 0,
      ...stepBits.flatMap((stepBit) => [(stepBit >> 8) & 0xff, stepBit & 0xff]),
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length !== 22) return;
    const octave = bytes[0] - 100;
    const duty = bytes[1] / 255;
    const stepBits = seqNumbers(10).map((i) => {
      const offset = 2 + i * 2;
      return (bytes[offset] << 8) | bytes[offset + 1];
    });
    store.assign({ octave, duty, stepBits });
  },
};
