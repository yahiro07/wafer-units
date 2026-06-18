import { getSortOrder, linearInterpolate, uniqueArrayItems } from "mofur/ax";
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
        id: 0,
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
      const id = 0;
      const position = inputNote.position + it.position - offset;
      const duration = it.duration;
      const pitch = inputNote.pitch + (it.pitch - patternNotes[0].pitch);
      return { id, position, duration, pitch, noteType: "ghostTails" };
    });
}

function generateMappedNotes_sliceOrShift(
  headNotes: Note[],
  tailNotes: Note[],
  patternBarsSteps: number,
  patternMode: "slice" | "shift",
) {
  const mappedNotes: Note[] = [];
  for (const note of headNotes) {
    mappedNotes.push({ ...note, noteType: "ghostHead" });
  }

  const generatorFn = {
    slice: generateNotesSliced,
    shift: generateNotesShifted,
  }[patternMode];

  const patternNotes = makePatternNotesRepeated(
    headNotes,
    patternBarsSteps,
    32,
  );
  for (const note of tailNotes) {
    const slicedNotes = generatorFn(note, patternNotes, patternBarsSteps);
    mappedNotes.push(...slicedNotes);
  }
  return refreshNoteIds(mappedNotes);
}

function extractNotePitchesInSpan(
  notes: Note[],
  stepFrom: number,
  stepTo: number,
): number[] {
  const notesInSpan = notes.filter(
    (it) => it.position < stepTo && stepFrom < it.position + it.duration,
  );
  const pitches = uniqueArrayItems(notesInSpan.map((it) => it.pitch));
  pitches.sort((a, b) => a - b);
  return pitches;
}

function mapNotePitch(
  notePitch: number,
  srcPitches: number[],
  destPitches: number[],
): number {
  const srcIndex = srcPitches.indexOf(notePitch);
  const destIndex = linearInterpolate(
    srcIndex,
    0,
    srcPitches.length,
    0,
    destPitches.length,
    true,
  );
  return destPitches[destIndex];
}

function refreshNoteIds(notes: Note[]): Note[] {
  return notes.map((note, index) => {
    return {
      ...note,
      id: index,
    };
  });
}

function generateMappedNotes_MultiShift(
  headNotes: Note[],
  tailNotes: Note[],
  patternBarsSteps: number,
  loopBarsSteps: number,
) {
  const nx = (loopBarsSteps / patternBarsSteps) >>> 0;
  const mappedNotes: Note[] = [];

  for (const note of headNotes) {
    mappedNotes.push({ ...note, noteType: "ghostHead" });
  }
  const srcPitches = extractNotePitchesInSpan(headNotes, 0, patternBarsSteps);

  for (let i = 1; i <= nx; i++) {
    const offset = i * patternBarsSteps;
    const destPitches = extractNotePitchesInSpan(
      tailNotes,
      offset,
      offset + patternBarsSteps,
    );
    if (destPitches.length === 0) continue;
    for (let i = 0; i < headNotes.length; i++) {
      const note = headNotes[i];
      const position = offset + note.position;
      const pitch = mapNotePitch(note.pitch, srcPitches, destPitches);
      mappedNotes.push({
        id: 0,
        pitch,
        position,
        duration: note.duration,
        noteType: "ghostTails",
      });
    }
  }
  return refreshNoteIds(mappedNotes);
}
export function generateMappedNotes(
  inputNotes: Note[],
  configs: {
    loopBars: number;
    patternBars: number;
    patternMode: PatternMode;
  },
): Note[] {
  const { loopBars, patternBars, patternMode } = configs;
  const patternBarsSteps = patternBars * 16;
  const loopBarsSteps = loopBars * 16;
  const headNotes = inputNotes.filter(
    (note) => note.position + note.duration <= patternBarsSteps,
  );
  headNotes.sort(getSortOrder((it) => it.position));

  const tailNotes = inputNotes.filter(
    (note) => note.position + note.duration > patternBarsSteps,
  );

  if (patternMode === "slice" || patternMode === "shift") {
    return generateMappedNotes_sliceOrShift(
      headNotes,
      tailNotes,
      patternBarsSteps,
      patternMode,
    );
  } else if (patternMode === "multiShift") {
    return generateMappedNotes_MultiShift(
      headNotes,
      tailNotes,
      patternBarsSteps,
      loopBarsSteps,
    );
  } else {
    throw new Error(`never reaches here`);
  }
}
