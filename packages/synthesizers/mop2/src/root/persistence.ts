import { Persistence } from "wafer-host/unit-types";
import { store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";

const ratioOptionValues = [0.5, 1, 2, 3, 4, 5, 7, 9, 11, 13];

function ratioToByte(ratio: number): number {
  const index = ratioOptionValues.indexOf(ratio);
  return index >= 0 ? index : 0;
}

function ratioFromByte(byte: number): number | null {
  return ratioOptionValues[byte] ?? null;
}

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
      ratioToByte(parameters.op1Ratio),
      unaryToByte(parameters.op1ModSpeed),
      unaryToByte(parameters.op1Mod),
      unaryToByte(parameters.op1Volume),
      ratioToByte(parameters.op2Ratio),
      unaryToByte(parameters.op2ModSpeed),
      unaryToByte(parameters.op2Mod),
      unaryToByte(parameters.op2Volume),
      unaryToByte(parameters.egAttack),
      unaryToByte(parameters.egDecay),
      unaryToByte(parameters.egRelease),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 12) return;
    const octave = octaveFromByte(bytes[0]);
    const op1Ratio = ratioFromByte(bytes[1]);
    const op2Ratio = ratioFromByte(bytes[5]);
    if (octave === null || op1Ratio === null || op2Ratio === null) return;
    const op1ModSpeed = unaryFromByte(bytes[2]);
    const op1Mod = unaryFromByte(bytes[3]);
    const op1Volume = unaryFromByte(bytes[4]);
    const op2ModSpeed = unaryFromByte(bytes[6]);
    const op2Mod = unaryFromByte(bytes[7]);
    const op2Volume = unaryFromByte(bytes[8]);
    const egAttack = unaryFromByte(bytes[9]);
    const egDecay = unaryFromByte(bytes[10]);
    const egRelease = unaryFromByte(bytes[11]);
    store.assign({
      parameters: {
        octave,
        op1Ratio,
        op1ModSpeed,
        op1Mod,
        op1Volume,
        op2Ratio,
        op2ModSpeed,
        op2Mod,
        op2Volume,
        egAttack,
        egDecay,
        egRelease,
      },
    });
  },
};
