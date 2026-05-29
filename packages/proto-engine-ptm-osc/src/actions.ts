import { SynthParameters } from "@/definitions/parameters";
import { setAppState } from "@/store";
import { createSynthesizerEngine } from "@/synthesis";

const synthEngine = createSynthesizerEngine();

export const uiActions = {
  async noteOn(noteNumber: number) {
    await synthEngine.resumeIfNeeded();
    synthEngine.noteOn(noteNumber);
    setAppState("notes", (prev) => [...prev, noteNumber]);
  },
  async noteOff(noteNumber: number) {
    synthEngine.noteOff(noteNumber);
    setAppState("notes", (prev) => prev.filter((n) => n !== noteNumber));
  },
  setSynthParam<K extends keyof SynthParameters>(
    paramKey: K,
    value: SynthParameters[K],
  ) {
    setAppState("synthParams", paramKey, value);
    synthEngine.setParameter(paramKey, value);
  },
};
