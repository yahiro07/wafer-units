const keyToNoteNumberMap = {
  Am: 57,
  B: 59,
  C: 60,
  Dm: 62,
  Em: 64,
  F: 65,
  G: 67,
};

export function getChordRootNote(key: string, relative: number) {
  const center =
    keyToNoteNumberMap[key as keyof typeof keyToNoteNumberMap] ?? 60;
  return center + relative;
}

const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

function isMinorChord(key: string, relative: number) {
  const semitoneFromTonic = ((relative % 12) + 12) % 12;
  if (key.endsWith("m")) {
    return [0, 5, 7].includes(semitoneFromTonic);
  }
  return [2, 4, 9].includes(semitoneFromTonic);
}

export function getChordName(key: string, relative: number) {
  const noteNumber = getChordRootNote(key, relative);
  const chordName = noteNames[((noteNumber % 12) + 12) % 12];
  return isMinorChord(key, relative) ? `${chordName}m` : chordName;
}

export function getRelNoteValues(key: string) {
  const type = key.endsWith("m") ? "minor" : "major";
  if (type === "major") {
    return [-7, -5, -3, -1, 0, 2, 4, 5, 7, 9];
  } else {
    return [-7, -5, -4, -2, 0, 2, 3, 5, 7, 8];
  }
}
