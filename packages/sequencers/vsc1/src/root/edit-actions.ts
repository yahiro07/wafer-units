import { PatternLength } from "@/defs/definitions";
import { store } from "@/root/store";

export const editActions = {
  setPatternLength(length: PatternLength) {
    store.setPatternLength(length);
    store.setNotes((notes) =>
      notes.map((note) => {
        if (note.position < length && note.position + note.duration > length) {
          return { ...note, duration: length - note.position };
        }
        return note;
      }),
    );
  },
  duplicateSteps2x() {
    const { patternLength, notes } = store.state;
    if (patternLength === 128) return;

    const half = patternLength;
    const length = (half * 2) as PatternLength;
    const remaining = notes.filter(
      (note) =>
        note.position >= length || note.position + note.duration <= half,
    );
    const nextId =
      remaining.length > 0
        ? Math.max(...remaining.map((note) => note.id)) + 1
        : 0;
    const copies = remaining
      .filter((note) => note.position < half)
      .map((note, i) => ({
        ...note,
        id: nextId + i,
        position: note.position + half,
      }));

    store.assign({
      patternLength: length,
      notes: [...remaining, ...copies],
    });
    // if (length === 32) {
    //   store.setCurrentPageIndex(1);
    // } else if (length === 64) {
    //   store.setCurrentPageIndex(2);
    // }
  },
  clearNotes() {
    store.setNotes([]);
  },
};
