import { synthEngine } from "@/audio/engine";
import { SynthParameters } from "@/state";
import { setAppState } from "@/store";

void synthEngine.init();

export const uiActions = {
  noteOn(noteNumber: number, time = 0) {
    synthEngine.noteOn(noteNumber, time);
    setAppState("numActiveNotes", synthEngine.getNumActiveNotes());
  },

  noteOff(noteNumber: number, time = 0) {
    synthEngine.noteOff(noteNumber, time);
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
