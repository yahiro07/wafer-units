import { useEffect } from "react";
import { SequenceEditorView } from "@/editor";
import { sequencer, unitInterface } from "@/sequencer";
import { store } from "@/store";
import { Note } from "@/types";

function setupSynchronization() {
  function affectNotes(notes: Note[]) {
    const stepNotes = notes.map((note) => ({
      position: note.position,
      relNoteNumber: note.relNoteNumber,
      duration: note.duration,
    }));
    sequencer.setStepNotes(stepNotes);
  }
  affectNotes(store.state.notes);
  store.subscribe((attrs) => {
    if (attrs.notes) {
      affectNotes(attrs.notes);
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
    hostCallbacks: {
      setMetaAttributes: sequencer.setMetaAttributes,
    },
  });
}

export const App = () => {
  useEffect(setupSynchronization, []);
  return (
    <div className="flex-vc">
      <SequenceEditorView />
    </div>
  );
};
