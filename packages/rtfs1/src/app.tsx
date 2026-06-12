import { useEffect } from "react";
import { SequenceEditorView } from "@/editor";
import { sequencerEngine, unitInterface } from "@/engine";

function setupSynchronization() {
  // store.subscribe((attrs) => {});

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      outputs: ["note"],
      inputs: ["note"],
    },
    clockHandlers: {
      start() {},
      stop() {
        sequencerEngine.allNotesOff();
      },
      processStep(stepIndex, time, unitDurationSec) {
        sequencerEngine.processStep(stepIndex, time, unitDurationSec);
      },
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
