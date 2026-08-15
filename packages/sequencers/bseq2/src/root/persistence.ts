import { Persistence } from "wafer-host/unit-types";
import { PatternRange } from "@/common/defs";
import { store } from "@/root/store";

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { octave, duty, patternRange, stepBits } = store.state;
    return new Uint8Array([
      octave + 100,
      (duty * 255) >>> 0,
      patternRange,
      (stepBits >> 24) & 0xff,
      (stepBits >> 16) & 0xff,
      (stepBits >> 8) & 0xff,
      stepBits & 0xff,
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length !== 7) return;
    const octave = bytes[0] - 100;
    const duty = bytes[1] / 255;
    const patternRange = bytes[2] as PatternRange;
    const stepBits =
      (bytes[3] << 24) | (bytes[4] << 16) | (bytes[5] << 8) | bytes[6];
    store.assign({ octave, duty, patternRange, stepBits });
  },
};
