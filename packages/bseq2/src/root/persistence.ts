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
      (stepBits >> 8) & 0xff,
      stepBits & 0xff,
    ]);
  },
  applyStateBytes(bytes: Uint8Array) {
    if (bytes.length !== 5) return;
    const octave = bytes[0] - 100;
    const duty = bytes[1] / 255;
    const patternRange = bytes[2] as PatternRange;
    const stepBits = (bytes[3] << 8) | bytes[4];
    store.assign({ octave, duty, patternRange, stepBits });
  },
};
