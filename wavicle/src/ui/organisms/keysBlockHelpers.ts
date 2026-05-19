export namespace keysBlockHelpers {
  const shift1 = 0.1;
  const semiToneOffsetMap = [
    0,
    1.0 - shift1,
    1,
    2.0 + shift1,
    2,
    3,
    4.0 - shift1,
    4,
    5.0,
    5,
    6.0 + shift1,
    6,
  ];

  export function getKeyOffsetInUnits(
    noteNumber: number,
    integerAligned?: boolean
  ) {
    const oct = (noteNumber / 12) >> 0;
    const semi = noteNumber % 12;
    let semiOffset = semiToneOffsetMap[semi];
    if (integerAligned) {
      semiOffset = Math.round(semiOffset);
    }
    return oct * 7 + semiOffset;
  }

  export function getNoteNumberFormKeyOffset(
    offset: number,
    bottomNoteNumber: number
  ) {
    return Math.floor(bottomNoteNumber + (offset * 12) / 7);
  }

  const blackKeySemiIndices = [1, 3, 6, 8, 10];
  export function checkBlackKey(noteNumber: number) {
    const semi = noteNumber % 12;
    return blackKeySemiIndices.includes(semi);
  }

  export function getKeysOuterWidthU(
    bottomNoteNumber: number,
    numKeys: number
  ): number {
    const offsetLU = getKeyOffsetInUnits(bottomNoteNumber, true);
    const offsetRU = getKeyOffsetInUnits(bottomNoteNumber + numKeys, true);
    return offsetRU - offsetLU;
  }
}
