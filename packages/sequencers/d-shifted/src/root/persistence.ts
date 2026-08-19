import { PatternLength } from "@/root/definitions";
import { store } from "@/root/store";
import { seqNumbers, unaryFromByte, unaryToByte } from "@/utils/helpers";
import { Persistence } from "wafer-host/unit-types";

namespace _persistentDataSpecTypes {
  type _SequencerEditState = {
    octaveShift: number; //-2~2 --> 98~102
    stepDuty: number; //unaryToFloat
    chordEnabled: boolean; //as is, 1byte
    chordToneFlags: boolean[]; //9bits, pack to 2bytes
    gaterEnabled: boolean; //as is, 1byte
    patternLength: PatternLength; //as is, 1byte
    stepNotes: number[]; //2bit/step, 32steps, pack to 8bytes
  };
}

const NUM_CHORD_TONES = 9;
const NUM_STEPS = 32;
const EXPECTED_LENGTH = 15;
const PATTERN_LENGTHS: PatternLength[] = [4, 8, 16, 32];

function packChordToneFlags(flags: boolean[]): [number, number] {
  let bits = 0;
  for (let i = 0; i < NUM_CHORD_TONES; i++) {
    if (flags[i]) bits |= 1 << i;
  }
  return [bits & 0xff, (bits >> 8) & 0xff];
}

function unpackChordToneFlags(lo: number, hi: number): boolean[] {
  const bits = lo | (hi << 8);
  return seqNumbers(NUM_CHORD_TONES).map((i) => ((bits >> i) & 1) === 1);
}

function packStepNotes(stepNotes: number[]): number[] {
  const bytes = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < NUM_STEPS; i++) {
    const byteIndex = i >> 2;
    const shift = (i & 3) * 2;
    bytes[byteIndex] |= (stepNotes[i] & 0b11) << shift;
  }
  return bytes;
}

function unpackStepNotes(bytes: Uint8Array, offset: number): number[] | null {
  const stepNotes = seqNumbers(NUM_STEPS).map((i) => {
    const byteIndex = offset + (i >> 2);
    const shift = (i & 3) * 2;
    return (bytes[byteIndex] >> shift) & 0b11;
  });
  if (stepNotes.some((code) => code > 2)) return null;
  return stepNotes;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const st = store.state;
    return new Uint8Array([
      st.octaveShift + 100,
      unaryToByte(st.stepDuty),
      st.chordEnabled ? 1 : 0,
      ...packChordToneFlags(st.chordToneFlags),
      st.gaterEnabled ? 1 : 0,
      st.patternLength,
      ...packStepNotes(st.stepNotes),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== EXPECTED_LENGTH) return;

    const octaveShift = bytes[0] - 100;
    if (octaveShift < -2 || octaveShift > 2) return;

    const stepDuty = unaryFromByte(bytes[1]);
    const chordEnabled = bytes[2] !== 0;
    const chordToneFlags = unpackChordToneFlags(bytes[3], bytes[4]);
    const gaterEnabled = bytes[5] !== 0;
    const patternLength = bytes[6] as PatternLength;
    if (!PATTERN_LENGTHS.includes(patternLength)) return;

    const stepNotes = unpackStepNotes(bytes, 7);
    if (!stepNotes) return;

    store.assign({
      octaveShift,
      stepDuty,
      chordEnabled,
      chordToneFlags,
      gaterEnabled,
      patternLength,
      stepNotes,
    });
  },
};
