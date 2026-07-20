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
      parameters.wave,
      unaryToByte(parameters.shape),
      unaryToByte(parameters.detune2),
      unaryToByte(parameters.pitchDrift),
      unaryToByte(parameters.shapeEgAttack),
      unaryToByte(parameters.shapeEgDecay),
      unaryToByte(parameters.shapeModAmount),
      parameters.subOscWave,
      unaryToByte(parameters.subOscVolume),
      unaryToByte(parameters.ampAttack),
      unaryToByte(parameters.ampDecay),
      unaryToByte(parameters.ampSustain),
      unaryToByte(parameters.ampRelease),
      unaryToByte(parameters.tone),
      unaryToByte(parameters.chorus),
      unaryToByte(parameters.outputVolume),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 17) return;
    const octave = octaveFromByte(bytes[0]);
    const wave = bytes[1];
    const subOscWave = bytes[8];
    if (octave === null || wave < 0 || wave > 7 || subOscWave < 0 || subOscWave > 3) {
      return;
    }
    const shape = unaryFromByte(bytes[2]);
    const detune2 = unaryFromByte(bytes[3]);
    const pitchDrift = unaryFromByte(bytes[4]);
    const shapeEgAttack = unaryFromByte(bytes[5]);
    const shapeEgDecay = unaryFromByte(bytes[6]);
    const shapeModAmount = unaryFromByte(bytes[7]);
    const subOscVolume = unaryFromByte(bytes[9]);
    const ampAttack = unaryFromByte(bytes[10]);
    const ampDecay = unaryFromByte(bytes[11]);
    const ampSustain = unaryFromByte(bytes[12]);
    const ampRelease = unaryFromByte(bytes[13]);
    const tone = unaryFromByte(bytes[14]);
    const chorus = unaryFromByte(bytes[15]);
    const outputVolume = unaryFromByte(bytes[16]);
    store.assign({
      parameters: {
        octave,
        wave,
        shape,
        detune2,
        pitchDrift,
        shapeEgAttack,
        shapeEgDecay,
        shapeModAmount,
        subOscWave,
        subOscVolume,
        ampAttack,
        ampDecay,
        ampSustain,
        ampRelease,
        tone,
        chorus,
        outputVolume,
      },
    });
  },
};
