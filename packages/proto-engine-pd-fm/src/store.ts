import { createStore } from "solid-js/store";
import { createSynthParameters, SynthParameters } from "@/state";

export const [appState, setAppState] = createStore<{
  synthParams: SynthParameters;
  numActiveNotes: number;
}>({
  synthParams: createSynthParameters(),
  numActiveNotes: 0,
});
