import { Note, PatternMode } from "@/store/types";

function getNoteSliced(
  inputNote: Note,
  patternNotes: Note[],
  patternBarsSteps: number,
): Note[] {
  const offset = inputNote.position % patternBarsSteps;
  return patternNotes
    .filter(
      (it) =>
        it.position >= offset &&
        it.position + it.duration <= offset + inputNote.duration,
    )
    .map((it) => {
      return {
        id: inputNote.id * 1000 + it.id,
        position: inputNote.position + it.position - offset,
        duration: it.duration,
        pitch: inputNote.pitch,
        noteType: "ghostTails",
      };
    });
}

export function generateMappedNotes(
  inputNotes: Note[],
  configs: {
    loopBars: number;
    patternBars: number;
    patternMode: PatternMode;
  },
): Note[] {
  const patternBarsSteps = configs.patternBars * 16;
  const headNotes = inputNotes.filter(
    (note) => note.position + note.duration <= patternBarsSteps,
  );
  const tailNotes = inputNotes.filter(
    (note) => note.position + note.duration > patternBarsSteps,
  );
  const mappedNotes: Note[] = [];
  for (const note of headNotes) {
    mappedNotes.push({ ...note, noteType: "ghostHead" });
  }
  if (configs.patternMode === "slice") {
    for (const note of tailNotes) {
      const slicedNotes = getNoteSliced(note, headNotes, patternBarsSteps);
      mappedNotes.push(...slicedNotes);
    }
  }
  return mappedNotes;
}
