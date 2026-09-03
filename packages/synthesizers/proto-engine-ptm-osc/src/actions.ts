import { SynthParameters } from "@/definitions/parameters";
import { setAppState } from "@/store";
import { createSynthesizerEngine } from "@/synthesis";

export const synthEngine = createSynthesizerEngine();

export const uiActions = {
  noteOn(noteNumber: number, time = 0) {
    synthEngine.noteOn(noteNumber, time);
    setAppState("notes", (prev) => [...prev, noteNumber]);
  },
  noteOff(noteNumber: number, time = 0) {
    synthEngine.noteOff(noteNumber, time);
    setAppState("notes", (prev) => prev.filter((n) => n !== noteNumber));
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
