import { createStore } from "solid-js/store";
import {
  createSynthParameters,
  SynthParameters,
} from "@/definitions/parameters";

export const [appState, setAppState] = createStore<{
  synthParams: SynthParameters;
  notes: number[];
}>({
  synthParams: createSynthParameters(),
  notes: [],
});
