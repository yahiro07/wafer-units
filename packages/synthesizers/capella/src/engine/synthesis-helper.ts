export function midiToFrequency(midiNote: number): number {
  return 440 * 2 ** ((midiNote - 69) / 12);
}
