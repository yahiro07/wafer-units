import { pickObjectMembers } from "mofur/ax";
import { useEffect } from "react";
import { Dev3PianoRollEditorView } from "@/dev3-piano-roll-edit";
import { sequencer, unitInterface } from "@/logic/sequencer";
import { store } from "@/store/store";
import { Note } from "@/store/types";

function setupSynchronization() {
  function affectNotes(notes: Note[]) {
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
  // return <Dev2PianoRollEditorView />;
  return <Dev3PianoRollEditorView />;
};
