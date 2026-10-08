import { createStore } from "solid-js/store";
import { seqNumbers } from "@lib/mu2609/utils/helpers";

type Size = { width: number; height: number };

function createAppModel() {
  const [appState, setAppState] = createStore<{
    numActiveChannels: number;
    notes: Record<number, number[]>;
  }>({
    numActiveChannels: 4,
    notes: Object.fromEntries(seqNumbers(6).map((i) => [i, []])),
  });

  const actions = {
    noteOn(ch: number, noteNumber: number) {
      setAppState("notes", (prev) => ({
        ...prev,
        [ch]: [...prev[ch], noteNumber],
      }));
    },
  };

  actions.noteOn(0, 60);
  actions.noteOn(0, 67);
  actions.noteOn(1, 48);
  actions.noteOn(2, 72);
  actions.noteOn(2, 75);

  return {
    getters: {
      numActiveChannels: () => appState.numActiveChannels,
      channelNotes: (ch: number) => appState.notes[ch],
    },
    setSize(size: Size) {},
  };
}
export const appModel = createAppModel();
