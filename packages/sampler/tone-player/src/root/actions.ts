import { CommonParameters } from "@/definitions/types";
import { store } from "@/root/store";

export const actions = {
  setSlotParameter(
    slotIndex: number,
    key: "volume" | "pan" | "aux",
    value: number,
  ) {
    store.setSlots((prev) =>
      prev.map((slot, index) =>
        index === slotIndex ? { ...slot, [key]: value } : slot,
      ),
    );
  },
  setCommonParameter: <K extends keyof CommonParameters>(
    key: K,
    value: CommonParameters[K],
  ) => {
    store.patchCommonParameters({ [key]: value });
  },
  clearLevelsMap() {
    store.setLevelsMap({});
  },
  setLevels(audioIndex: number, levels: number[]) {
    store.patchLevelsMap({ [audioIndex]: levels });
  },
  setErrorMessage(errorMessage: string | null) {
    store.setErrorMessage(errorMessage);
  },
  //do not call this while editing text,
  //please set it after complete edit
  setAudioSourceText(audioSourceText: string) {
    store.setAudioSourceText(audioSourceText);
  },
};
