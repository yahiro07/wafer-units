import { pickObjectMembers } from "mofur/ax";
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
    if (attrs.noteDuty !== undefined || attrs.octaveShift !== undefined) {
      sequencer.setAttrs(pickObjectMembers(attrs, ["octaveShift", "noteDuty"]));
    }
  });

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [240, 130],
    },
    noteInput: {
      noteOn: sequencer.inputNoteOn,
      noteOff: sequencer.inputNoteOff,
    },
    clockHandlers: {
      start: sequencer.startClock,
      stop: sequencer.endClock,
      processStep: sequencer.processStep,
    },
    hostCallbacks: {
      setMetaAttributes: sequencer.setMetaAttributes,
    },
  });
}

export const App = () => {
  useEffect(setupSynchronization, []);
  return <SequenceEditorView />;
};
