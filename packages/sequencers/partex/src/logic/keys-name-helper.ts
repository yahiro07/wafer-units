import { SongKeySpec } from "wafer-host/unit-types";

const nameSeries = [
  "C/Am",
  "C#/Am#",
  "D/Bm",
  "D#/Cm",
  "E/C#m",
  "F/Dm",
  "F#/D#m",
  "G/Em",
  "G#/Fm",
  "A/F#m",
  "A#/Gm",
  "B/G#m",
];

export function mapKeySpecToKeysName(keySpec: SongKeySpec) {
  const index = (keySpec.keyTranspose + 24) % 12;
  return nameSeries[index];
}
