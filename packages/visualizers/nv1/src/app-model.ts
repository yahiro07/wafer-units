import { createStore } from "solid-js/store";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { queryUnitInterface } from "wafer-host/unit-types";
import { WaferExNotesVisualizer } from "@/wafer-ex-notes-visualizer";

type Size = { width: number; height: number };

function createAppModel() {
  const unitInterface = queryUnitInterface("wafer-v01");

  const [appState, setAppState] = createStore<{
    numActiveChannels: number;
    notes: Record<number, number[]>;
    viewActive: boolean;
  }>({
    numActiveChannels: 4,
    notes: Object.fromEntries(seqNumbers(6).map((i) => [i, []])),
    viewActive: false,
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
    setViewActive(active: boolean) {
      setAppState("viewActive", active);
    },
  };

  if (0) {
    actions.noteOn(0, 60);
    actions.noteOn(0, 67);
    actions.noteOn(1, 48);
    actions.noteOn(2, 72);
    actions.noteOn(2, 75);
  }

  if (unitInterface) {
    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
      },
      unitCallbacks: {
        setViewActive: actions.setViewActive,
        onMessageFromHost(message: WaferExNotesVisualizer["MessageFromHost"]) {
          if (message.type === "note") {
            if (message.isOn) {
              actions.noteOn(message.ch, message.noteNumber);
            } else {
              actions.noteOff(message.ch, message.noteNumber);
            }
          }
        },
      },
    });
  } else {
    actions.setViewActive(true);
  }

  return {
    getters: {
      numActiveChannels: () => appState.numActiveChannels,
      channelNotes: (ch: number) => appState.notes[ch],
      viewActive: () => appState.viewActive,
    },
    setSize(size: Size) {
      unitInterface?.setViewSize(size);
    },
  };
}
export const appModel = createAppModel();
