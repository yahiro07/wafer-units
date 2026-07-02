import { pickObjectMembers } from "mofur/ax";
import { useEffect } from "react";
import { EditorView } from "@/editor";
import { sequencer, unitInterface } from "@/sequencer";
import { store } from "@/store";
import { SynthPatternNote } from "@/types";

function setupSynchronization() {
  function affectNotes(notes: SynthPatternNote[]) {
    const stepNotes = notes.map((note) => ({
      position: note.stepPosition,
      relNoteNumber: note.relativeNoteNumber,
      duration: note.stepDuration,
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
      outputs: ["note"],
      inputs: ["note"],
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
  return <EditorView />;
};
