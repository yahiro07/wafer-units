const pitchNameSeries = [
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

export function mapPitchIndexToPitchName(pitchIndex: number) {
  const octave = Math.floor(pitchIndex / 12) + 3;
  const name = pitchNameSeries[(pitchIndex + 120) % 12];
  return `${name}${octave}`;
}
