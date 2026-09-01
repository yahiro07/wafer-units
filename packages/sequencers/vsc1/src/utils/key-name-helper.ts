import { KeySpec } from "@/defs/definitions";

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

export function mapKeySpecToKeyName(keySpec: KeySpec) {
  const index = (keySpec.root + 24) % 12;
  return nameSeries[index] + (keySpec.mode === "minor" ? "m" : "");
}
