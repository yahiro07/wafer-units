import { pickObjectMembers } from "mofur/ax";
import { useEffect } from "react";
import { generateMappedNotes } from "@/logic/ghost-engine";
import { sequencer, unitInterface } from "@/logic/sequencer";
import { store } from "@/store/store";
import { Note } from "@/store/types";
import { BottomBar } from "./bottom-bar";
import { ControlsSection } from "./controls-section";
import { PianoRollEditorView } from "./piano-roll-editor-view";

function setupSynchronization() {
  function affectNotes(notes: Note[]) {
    const stepNotes = notes.map((note) => ({
      position: note.stepPosition,
      relNoteNumber: note.relativeNoteNumber,
      duration: note.stepDuration,
    }));
    sequencer.setStepNotes(stepNotes);
  }
  affectNotes(store.state.inputNotes);
  sequencer.setAttrs({
    octaveShift: store.state.octaveShift,
    noteDuty: store.state.noteDuty,
    loopBars: store.state.loopBars,
  });

  const unsubscribeStore = store.subscribe((attrs) => {
    if (attrs.mappedNotes) {
      affectNotes(attrs.mappedNotes);
    }
    if (
      attrs.noteDuty !== undefined ||
      attrs.octaveShift !== undefined ||
      attrs.loopBars !== undefined
    ) {
      sequencer.setAttrs(
        pickObjectMembers(attrs, ["octaveShift", "noteDuty", "loopBars"]),
      );
    }
  });

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      outputs: ["note"],
      inputs: ["note"],
    },
    noteInput: {
      noteOn: sequencer.inputNoteOn,
      noteOff: sequencer.inputNoteOff,
    },
    clockHandlers: {
      start() {},
      stop() {
        sequencer.allNotesOff();
      },
      processStep(stepIndex, time, unitDurationSec) {
        sequencer.processStep(stepIndex, time, unitDurationSec);
      },
    },
  });

  return unsubscribeStore;
}

function useGenerateMappedNotes() {
  const { inputNotes, loopBars, patternBars, ghostEnabled, patternMode } =
    store.useSnapshot();
  useEffect(() => {
    const mappedNotes = ghostEnabled
      ? generateMappedNotes(inputNotes, { loopBars, patternBars, patternMode })
      : inputNotes;
    store.setMappedNotes(mappedNotes);
  }, [inputNotes, loopBars, patternBars, ghostEnabled, patternMode]);
}

export const App = () => {
  useEffect(setupSynchronization, []);
  // return <Dev2PianoRollEdit />;
  useGenerateMappedNotes();
  return (
    <div className="bg-white">
      <div className="w-[800px] h-[500px] border border-cyan-600 bg-blue-100/20 flex-c">
        <div className="flex-v gap-2">
          <ControlsSection />
          <PianoRollEditorView />
          <BottomBar />
        </div>
      </div>
    </div>
  );
};
