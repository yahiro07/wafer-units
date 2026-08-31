import { store } from "@/root/store";

export const actions = {
  previewTone(pitchIndex: number) {
    if (pitchIndex >= 0) {
      store.setTonePreviewPitchIndex(pitchIndex);
      store.setLatestPitchIndex(pitchIndex);
    } else {
      store.setTonePreviewPitchIndex(-1);
    }
  },
};
