import {
  allPartKeys,
  PartItem,
  PartKey,
  pitchTweakRangeMap,
  StepNote,
} from "@/model/defs";
import { allSampleKeys } from "@/ui/common/ui-data";
import { store } from "@/ui/store/store";
import { clampValue, seqNumbers } from "@/utils/helpers";
import { Persistence } from "wafer-host/unit-types";

namespace _savedDataReferenceTypes {
  type StepNote = {
    pitch: number; //ignore, not saving
    velocity: number; //0.5 or 1, 0.5 is mapped to weakVelocity --> 1 or 2 for persistence, bit flags
  };

  type PartItem = {
    partKey: PartKey; //allPartKey.indexOf
    sampleKey: string; //allSampleKeys.indexOf
    pitchTweak: number; //refer pitchTweakRangeMap, linear(-2, 2)--> 0~255, integer(-6, 6)--> 100-6~100+6
    weakVelocity: number; //unaryToByte
    volume: number; //unaryToByte
    stepLength: number; //as is, 1byte
    notes: (StepNote | null)[]; //pack 32 steps notes into 8 bytes, 2bits/step
    outputActive: boolean; //1byte
  };

  type _StoreState = {
    currentPartKey: PartKey; //allPartKey.indexOf
    soloMode: boolean; //1byte
    partItems: PartItem[];
    masterVolume: number; //unaryToByte
  };
}

const NUM_STEPS = 32;
const BYTES_PER_PART = 15; // partKey, sampleKey, pitchTweak, weakVelocity, volume, stepLength, notes(8), outputActive
const HEADER_BYTES = 2; // currentPartKey, soloMode
const FOOTER_BYTES = 1; // masterVolume
const EXPECTED_LENGTH =
  HEADER_BYTES + allPartKeys.length * BYTES_PER_PART + FOOTER_BYTES;

const VALID_STEP_LENGTHS = new Set([4, 8, 16, 32]);

function unaryToByte(value: number): number {
  return (clampValue(value, 0, 1) * 255) >>> 0;
}

function unaryFromByte(byte: number): number {
  return byte / 255;
}

function pitchTweakToByte(partKey: PartKey, value: number): number {
  const [min, max, type] = pitchTweakRangeMap[partKey];
  if (type === "integer") {
    return 100 + Math.round(clampValue(value, min, max));
  }
  const t = (clampValue(value, min, max) - min) / (max - min);
  return (t * 255) >>> 0;
}

function pitchTweakFromByte(partKey: PartKey, byte: number): number {
  const [min, max, type] = pitchTweakRangeMap[partKey];
  if (type === "integer") {
    return clampValue(byte - 100, min, max);
  }
  return min + (byte / 255) * (max - min);
}

function noteToCode(note: StepNote | null | undefined): number {
  if (!note) return 0;
  return note.velocity === 0.5 ? 2 : 1;
}

function codeToNote(code: number): StepNote | null {
  if (code === 1) return { pitch: 0, velocity: 1 };
  if (code === 2) return { pitch: 0, velocity: 0.5 };
  return null;
}

function packNotes(notes: (StepNote | null)[]): number[] {
  const bytes = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < NUM_STEPS; i++) {
    const code = noteToCode(notes[i]);
    const byteIndex = i >> 2;
    const shift = (i & 3) * 2;
    bytes[byteIndex] |= code << shift;
  }
  return bytes;
}

function unpackNotes(bytes: Uint8Array, offset: number): (StepNote | null)[] {
  return seqNumbers(NUM_STEPS).map((i) => {
    const byteIndex = offset + (i >> 2);
    const shift = (i & 3) * 2;
    const code = (bytes[byteIndex] >> shift) & 0b11;
    return codeToNote(code);
  });
}

function emitPartItem(part: PartItem): number[] {
  return [
    allPartKeys.indexOf(part.partKey),
    allSampleKeys.indexOf(part.sampleKey),
    pitchTweakToByte(part.partKey, part.pitchTweak),
    unaryToByte(part.weakVelocity),
    unaryToByte(part.volume),
    part.stepLength,
    ...packNotes(part.notes),
    part.outputActive ? 1 : 0,
  ];
}

function readPartItem(
  bytes: Uint8Array,
  offset: number,
  expectedPartKey: PartKey,
): PartItem | null {
  const partKey = allPartKeys[bytes[offset]];
  if (partKey !== expectedPartKey) return null;

  const sampleKey = allSampleKeys[bytes[offset + 1]];
  if (!sampleKey) return null;

  const stepLength = bytes[offset + 5];
  if (!VALID_STEP_LENGTHS.has(stepLength)) return null;

  const packedNotes = unpackNotes(bytes, offset + 6);
  return {
    partKey,
    sampleKey,
    pitchTweak: pitchTweakFromByte(partKey, bytes[offset + 2]),
    weakVelocity: unaryFromByte(bytes[offset + 3]),
    volume: unaryFromByte(bytes[offset + 4]),
    stepLength,
    notes: packedNotes.slice(0, stepLength),
    outputActive: bytes[offset + 14] !== 0,
  };
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { currentPartKey, soloMode, partItems, masterVolume } = store.state;
    const partsByKey = new Map(
      partItems.map((part) => [part.partKey, part] as const),
    );
    return new Uint8Array([
      allPartKeys.indexOf(currentPartKey),
      soloMode ? 1 : 0,
      ...allPartKeys.flatMap((partKey) => {
        const part = partsByKey.get(partKey);
        if (!part) {
          throw new Error(`missing part item: ${partKey}`);
        }
        return emitPartItem(part);
      }),
      unaryToByte(masterVolume),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== EXPECTED_LENGTH) return;

    const currentPartKey = allPartKeys[bytes[0]];
    if (!currentPartKey) return;

    const soloMode = bytes[1] !== 0;
    const partItems: PartItem[] = [];
    for (let i = 0; i < allPartKeys.length; i++) {
      const part = readPartItem(
        bytes,
        HEADER_BYTES + i * BYTES_PER_PART,
        allPartKeys[i],
      );
      if (!part) return;
      partItems.push(part);
    }
    const masterVolume = unaryFromByte(bytes[EXPECTED_LENGTH - 1]);

    store.assign({
      currentPartKey,
      soloMode,
      partItems,
      masterVolume,
    });
  },
};
