import { SongKeySpec } from "wafer-host/unit-types";

const nameSeries = [
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

export function mapKeySpecToKeysName(keySpec: SongKeySpec) {
  const majorRoot =
    (keySpec.root + (keySpec.mode === "minor" ? 3 : 0) + 12) % 12;
  const majorKeyName = nameSeries[majorRoot];
  const minorKeyName = nameSeries[(majorRoot + 9) % 12] + "m";
  return `${majorKeyName}/${minorKeyName}`;
}
