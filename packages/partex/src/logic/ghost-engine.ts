import { Note, PatternMode } from "@/store/types";

function makePatternNotesRepeated(
  headNotes: Note[],
  patternBarsSteps: number,
  stepsTo: number,
): Note[] {
  const resNotes: Note[] = [];
  const nx = Math.ceil(stepsTo / patternBarsSteps);
  for (let i = 0; i < nx; i++) {
    const offset = i * patternBarsSteps;
    for (const note of headNotes) {
      resNotes.push({
        ...note,
        position: offset + note.position,
      });
    }
  }
  return resNotes;
}

function generateNotesSliced(
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

function generateNotesShifted(
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
      const id = inputNote.id * 1000 + it.id;
      const position = inputNote.position + it.position - offset;
      const duration = it.duration;
      const pitch = inputNote.pitch + (it.pitch - patternNotes[0].pitch);
      return {
        id,
        position,
        duration,
        pitch,
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
  const generatorFn = {
    slice: generateNotesSliced,
    shift: generateNotesShifted,
  }[configs.patternMode];

  const patternNotes = makePatternNotesRepeated(
    headNotes,
    patternBarsSteps,
    32,
  );

  for (const note of tailNotes) {
    const slicedNotes = generatorFn(note, patternNotes, patternBarsSteps);
    mappedNotes.push(...slicedNotes);
  }
  return mappedNotes;
}
