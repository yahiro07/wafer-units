import { store } from "@/root/store";

export const actions = {
  setPreviewNoteNumber(noteNumber: number) {
    store.setPreviewNoteNumber(noteNumber);
  },
  setPreviewPitchIndex(pitchIndex: number) {
    if (pitchIndex >= 0) {
      const noteNumber = 48 + pitchIndex;
      store.setPreviewNoteNumber(noteNumber);
      store.setLatestPitchIndex(pitchIndex);
    } else {
      store.setPreviewNoteNumber(-1);
    }
  },
};
