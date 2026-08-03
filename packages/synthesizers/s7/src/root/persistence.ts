import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

function octaveToByte(octave: number): number {
  return octave + 2;
}

function octaveFromByte(byte: number): number | null {
  const octave = byte - 2;
  if (octave < -2 || octave > 2) return null;
  return octave;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { parameters } = store.state;
    return new Uint8Array([
      octaveToByte(parameters.octave),
      unaryToByte(parameters.unisonDetune),
      unaryToByte(parameters.unisonSpread),
      unaryToByte(parameters.unisonMix),
      parameters.phaseRandom ? 1 : 0,
      unaryToByte(parameters.ampRelease),
      unaryToByte(parameters.volume),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 7) return;
    const octave = octaveFromByte(bytes[0]);
    if (octave === null) return;
    const unisonDetune = unaryFromByte(bytes[1]);
    const unisonSpread = unaryFromByte(bytes[2]);
    const unisonMix = unaryFromByte(bytes[3]);
    const phaseRandom = bytes[4] !== 0;
    const ampRelease = unaryFromByte(bytes[5]);
    const volume = unaryFromByte(bytes[6]);
    store.assign({
      parameters: {
        octave,
        unisonDetune,
        unisonSpread,
        unisonMix,
        phaseRandom,
        ampRelease,
        volume,
      },
    });
  },
};
