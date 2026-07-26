const subNoteNames = [
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

export function getNoteNameLabel(noteNumber: number) {
  const octave = (noteNumber / 12) >>> 0;
  const subIndex = noteNumber % 12;
  return `${subNoteNames[subIndex]}${octave}`;
}
