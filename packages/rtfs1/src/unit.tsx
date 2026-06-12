import { useEffect } from "react";
import { SequenceEditorView } from "@/editor";
import { sequencer, unitInterface } from "@/sequencer";

function setupSynchronization() {
  // store.subscribe((attrs) => {});

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
