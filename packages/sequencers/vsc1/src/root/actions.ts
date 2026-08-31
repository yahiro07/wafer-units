import { store } from "@/root/store";

export const actions = {
  setPreviewNoteNumber(noteNumber: number) {
    store.setPreviewNoteNumber(noteNumber);
  },
};
