import { store } from "@/root/store";

export const actions = {
  previewTone(pitchIndex: number) {
    if (pitchIndex >= 0) {
      const noteNumber = 48 + pitchIndex;
      store.setTonePreviewNoteNumber(noteNumber);
      store.setLatestPitchIndex(pitchIndex);
    } else {
      store.setTonePreviewNoteNumber(-1);
    }
  },
};
