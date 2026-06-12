import { createStore } from "snap-store";
import { DraftNote, Note } from "@/types";

const defaultNotes: Note[] = [
  { id: "n0", lane: 2, relNoteNumber: 0, position: 0, duration: 2 },
  { id: "n1", lane: 1, relNoteNumber: 4, position: 2, duration: 2 },
  { id: "n3", lane: 1, relNoteNumber: 6, position: 4, duration: 4 },
  { id: "n2", lane: 0, relNoteNumber: 8, position: 4, duration: 4 },
];

export const store = createStore<{
  notes: Note[];
  draftNote: DraftNote | null;
}>({
  notes: defaultNotes,
  draftNote: null,
});
