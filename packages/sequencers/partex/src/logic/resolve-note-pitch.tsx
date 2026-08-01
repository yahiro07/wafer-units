import { clampValue } from "mofur/ax";

const subIndexMap = new Map([
  [0, 0],
  [0.5, 1],
  [1, 2],
  [1.5, 3],
  [2, 4],
  [3, 5],
  [3.5, 6],
  [4, 7],
  [4.5, 8],
  [5, 9],
  [5.5, 10],
  [6, 11],
]);

export function resolveNotePitch(
  relNoteNumber: number,
  octaveShift: number,
  keyTranspose: number,
) {
  const octave = (relNoteNumber / 7) >>> 0;
  const subNote = relNoteNumber - octave * 7;
  const subNoteI = subIndexMap.get(subNote) ?? 0;
  return clampValue(
    60 + (octave - 2) * 12 + subNoteI + octaveShift * 12 + keyTranspose,
    0,
    127,
  );
}
