import { createStore } from "solid-js/store";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { queryUnitInterface } from "wafer-host/unit-types";

type Size = { width: number; height: number };

function createAppModel() {
  const unitInterface = queryUnitInterface("wafer-v01");

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
    noteOff(ch: number, noteNumber: number) {
      setAppState("notes", (prev) => ({
        ...prev,
        [ch]: prev[ch].filter((n) => n !== noteNumber),
      }));
    },
  };

  // actions.noteOn(0, 60);
  // actions.noteOn(0, 67);
  // actions.noteOn(1, 48);
  // actions.noteOn(2, 72);
  // actions.noteOn(2, 75);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "effect",
    },
    noteInput: {
      noteOn(noteNumber) {
        actions.noteOn(0, noteNumber);
      },
      noteOff(noteNumber) {
        actions.noteOff(0, noteNumber);
      },
    },
  });
  return {
    getters: {
      numActiveChannels: () => appState.numActiveChannels,
      channelNotes: (ch: number) => appState.notes[ch],
    },
    setSize(size: Size) {
      unitInterface?.setViewSize(size);
    },
  };
}
export const appModel = createAppModel();
