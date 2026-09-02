import { Persistence } from "wafer-host/unit-types";
import { KeyLabelMode, LoopBars } from "@/root/parameters";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

const keyLabelModes: KeyLabelMode[] = ["doremi", "degreeMajor", "degreeMinor"];

const loopBarsValues: LoopBars[] = [1, 2, 4, 8, 16];

const EMPTY_NOTE = 255;

function noteToByte(note: number): number {
  return note === -1 ? EMPTY_NOTE : note;
}

function noteFromByte(byte: number): number | null {
  if (byte === EMPTY_NOTE) return -1;
  if (byte < 0 || byte > 8) return null;
  return byte;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const { keyLabelMode, loopBars, notes } = store.state;
    return new Uint8Array([
      keyLabelModes.indexOf(keyLabelMode),
      loopBars,
      ...notes.map(noteToByte),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length !== 18) return;
    const keyLabelMode = keyLabelModes[bytes[0]];
    const loopBars = bytes[1] as LoopBars;
    if (!keyLabelMode || !loopBarsValues.includes(loopBars)) return;
    const notes = seqNumbers(16).map((i) => noteFromByte(bytes[2 + i]));
    if (notes.includes(null)) return;
    store.assign({
      keyLabelMode,
      loopBars,
      notes: notes as number[],
    });
  },
};
