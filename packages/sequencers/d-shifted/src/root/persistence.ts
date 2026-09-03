import { BaseStep, Note, PatternLength } from "@/root/definitions";
import { store } from "@/root/store";
import { unaryFromByte, unaryToByte } from "@/utils/helpers";
import { Persistence } from "wafer-host/unit-types";

namespace _persistentDataSpecTypes {
  type Note = {
    id: number; //omit
    pitch: number; //0~21, 5bit
    position: number; //0~63, as is, 1byte
    duration: number; //0~63, as is, 1byte
  };

  type _SequencerEditState = {
    baseStep: BaseStep; //save as number, 16 for "16th", 8 for "8th"
    octaveShift: number; //-2~2 --> 98~102
    stepDuty: number; //unaryToFloat
    shiftEnabled: boolean; //as is, 1byte
    patternLength: PatternLength; //as is, 1byte
    notes: Note[]; //numNotes(2bytes), ...notes ([0] for removed note, [0x80 | pitch, position, duration] for existing note)
  };
}

const PATTERN_LENGTHS: PatternLength[] = [4, 8, 16, 32, 64];
const BASE_STEPS: BaseStep[] = ["16th", "8th"];
const HEADER_LENGTH = 7;

function emitBaseStep(baseStep: BaseStep): number {
  return Number(baseStep.replace("th", ""));
}

function readBaseStep(value: number): BaseStep | null {
  const baseStep = `${value}th` as BaseStep;
  return BASE_STEPS.includes(baseStep) ? baseStep : null;
}

function emitNoteSlots(notes: Note[]): number[] {
  const byId = new Map(notes.map((note) => [note.id, note]));
  const numSlots =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 0;
  const bytes: number[] = [(numSlots >> 8) & 0xff, numSlots & 0xff];
  for (let id = 0; id < numSlots; id++) {
    const note = byId.get(id);
    if (!note) {
      bytes.push(0);
      continue;
    }
    bytes.push(0x80 | (note.pitch & 0x1f), note.position, note.duration);
  }
  return bytes;
}

function readNotes(bytes: Uint8Array, numSlots: number): Note[] | null {
  const notes: Note[] = [];
  let offset = HEADER_LENGTH;
  for (let id = 0; id < numSlots; id++) {
    if (offset >= bytes.length) return null;
    const marker = bytes[offset++];
    if (marker === 0) continue;
    if ((marker & 0x80) === 0) return null;
    if (offset + 1 >= bytes.length) return null;
    const pitch = marker & 0x1f;
    const position = bytes[offset++];
    const duration = bytes[offset++];
    if (pitch > 21 || duration < 1) return null;
    notes.push({ id, pitch, position, duration });
  }
  if (offset !== bytes.length) return null;
  return notes;
}

export const persistence: Persistence = {
  emitStateBytes(): Uint8Array {
    const st = store.state;
    return new Uint8Array([
      emitBaseStep(st.baseStep),
      st.octaveShift + 100,
      unaryToByte(st.stepDuty),
      st.shiftEnabled ? 1 : 0,
      st.patternLength,
      ...emitNoteSlots(st.notes),
    ]);
  },
  applyStateBytes(bytes) {
    if (bytes.length < HEADER_LENGTH) return;

    const baseStep = readBaseStep(bytes[0]);
    if (!baseStep) return;

    const octaveShift = bytes[1] - 100;
    if (octaveShift < -2 || octaveShift > 2) return;

    const stepDuty = unaryFromByte(bytes[2]);
    const shiftEnabled = bytes[3] !== 0;
    const patternLength = bytes[4] as PatternLength;
    if (!PATTERN_LENGTHS.includes(patternLength)) return;

    const numSlots = (bytes[5] << 8) | bytes[6];
    const notes = readNotes(bytes, numSlots);
    if (!notes) return;

    store.assign({
      baseStep,
      octaveShift,
      stepDuty,
      shiftEnabled,
      patternLength,
      notes,
      currentPageIndex: 0,
    });
    store.setStateLoadRevision((prev) => prev + 1);
  },
};
