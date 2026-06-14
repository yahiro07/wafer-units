import { SongKey } from "@/store/types";

export function checkKeyValid(key: string): SongKey | undefined {
  const valid = ["Am", "B", "C", "Dm", "Em", "F", "G"].includes(key as SongKey);
  return valid ? (key as SongKey) : undefined;
}

function getKeyRootNoteIndex(key: SongKey): number {
  const noteName = key.replace("m", "") as
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G";
  return {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  }[noteName];
}

function checkIsMinorChord(key: SongKey, chordRootNote: number): boolean {
  const isKeyMinor = key.endsWith("m");
  const keyRootNoteIndex = getKeyRootNoteIndex(key);
  const chordRootNoteIndex = chordRootNote % 12;
  const relativeIndex = (chordRootNoteIndex - keyRootNoteIndex + 12) % 12;
  if (!isKeyMinor) {
    //major key
    return [0, 2, 4, 9, 11].includes(relativeIndex);
  } else {
    //minor key
    return [0, 2, 5, 7].includes(relativeIndex);
  }
}

export function applyDynamicNoteShiftRTFS(
  rtfsNote: number, //0 for root, 1 for third, 2 for fifth, 3 for seventh, 4 for root in next octave, etc.
  key: SongKey, //C, Am, etc.
  chordRootNote: number, //MIDI note number of the chord root
  octaveShift: number, // octave shift
): number {
  const isMinor = checkIsMinorChord(key, chordRootNote);
  const intervals = isMinor ? [0, 3, 7, 10] : [0, 4, 7, 11];
  const rtfsOctave = Math.floor(rtfsNote / 4);
  return (
    chordRootNote + intervals[rtfsNote % 4] + (octaveShift + rtfsOctave) * 12
  );
}
