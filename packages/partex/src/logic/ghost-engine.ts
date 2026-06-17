import { Note, PatternMode } from "@/store/types";

export function generateMappedNotes(
  inputNotes: Note[],
  configs: {
    loopBars: number;
    patternBars: number;
    patternMode: PatternMode;
  },
): Note[] {
  const mappedNotes: Note[] = [];
  for (const note of inputNotes) {
    mappedNotes.push(note);
    mappedNotes.push({
      ...note,
      position: note.position + 16,
    });
  }
  return mappedNotes;
}
