import { synthEngine } from "@/audio/engine";
import { SynthParameters } from "@/state";
import { setAppState } from "@/store";

void synthEngine.init();

export const uiActions = {
  async noteOn(noteNumber: number) {
    await synthEngine.resumeIfNeeded();
    synthEngine.noteOn(noteNumber);
    setAppState("numActiveNotes", synthEngine.getNumActiveNotes());
  },

  noteOff(noteNumber: number) {
    synthEngine.noteOff(noteNumber);
    setAppState("numActiveNotes", synthEngine.getNumActiveNotes());
  },

  setSynthParam<K extends keyof SynthParameters>(
    paramKey: K,
    value: SynthParameters[K],
  ) {
    setAppState("synthParams", paramKey, value);
    synthEngine.setParameter(paramKey, value);
  },

  loadStates(attrs: { synthParams: SynthParameters }) {
    setAppState("synthParams", attrs.synthParams);
    synthEngine.setAllParameters(attrs.synthParams);
  },
};
