import { createStore } from "solid-js/store";
import {
  cloneSynthParameters,
  defaultSynthParameters,
} from "@/audio/default-parameters";
import type { SynthParameters } from "@/audio/types";

type AppState = {
  selectedProgramIndex: number;
  midiConnected: boolean;
  parameters: SynthParameters;
};

export const [appState, setAppState] = createStore<AppState>({
  selectedProgramIndex: 0,
  midiConnected: false,
  parameters: cloneSynthParameters(defaultSynthParameters),
});
