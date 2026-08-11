import {
  allLoopBars,
  allPartKeys,
  allPatternKeys,
  allSampleKeys,
  LoopBars,
  PartItem,
  PartKey,
  PatternKey,
  SampleKey,
} from "@/core/definitions";
import { store } from "@/root/store";
import { clampValue } from "@/utils/helpers";
import { Persistence } from "wafer-host/unit-types";

namespace _persistentSpecTypes {
  export type PartItem = {
    partKey: PartKey; //allPartKeys.indexOf
    sampleKey: SampleKey; //allSampleKeys.indexOf
    pitchTweak: number; //-1~1 --> 0~255
    volume: number; //0~1, unaryToByte
    enabled: boolean; //1byte
  };

  type SceneEditState = {
    patternKey: PatternKey; //allPatternKeys.indexOf
    loopBars: LoopBars; //as is, 1byte
    rollPartItem: PartItem;
    cymbalPartItem: PartItem;
    volumeSlopeUp: boolean; //1byte
    loopEnabled: boolean; //1byte
  };

  type _StoreState = SceneEditState & {
    oneShotTriggered: boolean; //non persistent
    partHitCounts: { [key in PartKey]?: number }; //non persistent
  };
}

const BYTES_PER_PART = 5;
const EXPECTED_LENGTH = 2 + BYTES_PER_PART * 2 + 2; // patternKey, loopBars, hat, cymbal, volumeSlopeUp, loopEnabled

function unaryToByte(value: number): number {
  return (clampValue(value, 0, 1) * 255) >>> 0;
}

function unaryFromByte(byte: number): number {
  return byte / 255;
}

function pitchTweakToByte(value: number): number {
  return unaryToByte((clampValue(value, -1, 1) + 1) / 2);
}

function pitchTweakFromByte(byte: number): number {
  return unaryFromByte(byte) * 2 - 1;
}

function emitPartItem(part: PartItem): number[] {
  return [
    allPartKeys.indexOf(part.partKey),
    allSampleKeys.indexOf(part.sampleKey),
    pitchTweakToByte(part.pitchTweak),
    unaryToByte(part.volume),
    part.enabled ? 1 : 0,
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

  return {
    partKey,
    sampleKey,
    pitchTweak: pitchTweakFromByte(bytes[offset + 2]),
    volume: unaryFromByte(bytes[offset + 3]),
    enabled: bytes[offset + 4] !== 0,
  };
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const {
      patternKey,
      loopBars,
      rollPartItem,
      cymbalPartItem,
      volumeSlopeUp,
      loopEnabled,
    } = store.state;
    return new Uint8Array([
      allPatternKeys.indexOf(patternKey),
      loopBars,
      ...emitPartItem(rollPartItem),
      ...emitPartItem(cymbalPartItem),
      volumeSlopeUp ? 1 : 0,
      loopEnabled ? 1 : 0,
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== EXPECTED_LENGTH) return;

    const patternKey = allPatternKeys[bytes[0]];
    if (!patternKey) return;

    const loopBars = bytes[1] as LoopBars;
    if (!allLoopBars.includes(loopBars)) return;

    const rollPartItem = readPartItem(bytes, 2, "roll");
    const cymbalPartItem = readPartItem(bytes, 2 + BYTES_PER_PART, "cymbal");
    if (!rollPartItem || !cymbalPartItem) return;

    store.assign({
      patternKey,
      loopBars,
      rollPartItem,
      cymbalPartItem,
      volumeSlopeUp: bytes[EXPECTED_LENGTH - 2] !== 0,
      loopEnabled: bytes[EXPECTED_LENGTH - 1] !== 0,
    });
  },
};
