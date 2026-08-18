import { PersistState } from "@/store/store";
import { KeysMode, PatternMode } from "@/store/types";

export function serializePersistState(state: PersistState): Uint8Array {
  return new Uint8Array([
    0xab, //magic
    0xcd, //magic
    1, //format revision
    (state.inputNotes.length >> 8) & 0xff,
    state.inputNotes.length & 0xff,
    ...state.inputNotes.flatMap((note) => [
      (note.id >> 8) & 0xff,
      note.id & 0xff,
      note.pitch,
      note.position,
      note.duration,
    ]),
    Math.round(state.noteDuty * 255),
    state.octaveShift + 100,
    (state.loopBars * 4) >>> 0,
    (state.patternBars * 4) >>> 0,
    ["slice", "shift", "polyphonicShift"].indexOf(state.patternMode),
    state.ghostEnabled ? 1 : 0,
    state.realized ? 1 : 0,
    ["major", "minor"].indexOf(state.keysMode),
  ]);
}

export function deserializePersistState(
  bytes: Uint8Array,
): PersistState | undefined {
  if (!(bytes[0] === 0xab && bytes[1] === 0xcd)) return undefined;
  const revision = bytes[2];
  if (revision !== 1) return undefined;
  const inputNotesLength = (bytes[3] << 8) | bytes[4];
  const expectedLength = 5 + inputNotesLength * 5 + 8;
  if (bytes.length !== expectedLength) return undefined;
  const inputNotes = [];
  for (let i = 0; i < inputNotesLength; i++) {
    const id = (bytes[5 + i * 5] << 8) | bytes[6 + i * 5];
    const pitch = bytes[7 + i * 5];
    const position = bytes[8 + i * 5];
    const duration = bytes[9 + i * 5];
    inputNotes.push({ id, pitch, position, duration });
  }
  const restBytes = bytes.slice(5 + inputNotesLength * 5);
  if (!(restBytes.length === 8)) return undefined;
  const noteDuty = restBytes[0] / 255;
  const octaveShift = restBytes[1] - 100;
  const loopBars = restBytes[2] / 4;
  const patternBars = restBytes[3] / 4;
  const patternMode = ["slice", "shift", "polyphonicShift"][
    restBytes[4]
  ] as PatternMode;
  const ghostEnabled = restBytes[5] > 0;
  const realized = restBytes[6] > 0;
  const keysMode = ["major", "minor"][restBytes[7]] as KeysMode;
  if (!patternMode || !keysMode) return undefined;
  return {
    inputNotes,
    noteDuty,
    octaveShift,
    loopBars,
    patternBars,
    patternMode,
    ghostEnabled,
    realized,
    keysMode,
  };
}
