import { pickObjectMembers } from "mofur/ax";
import { useEffect } from "react";
import { BottomBar } from "@/app/bottom-bar";
import { ControlsSection } from "@/app/controls-section";
import { PianoRollEditorView } from "@/app/piano-roll-editor-view";
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
  sequencer.setAttrs({
    octaveShift: store.state.octaveShift,
    noteDuty: store.state.noteDuty,
    loopBars: store.state.loopBars,
  });

  const unsubscribeStore = store.subscribe((attrs) => {
    if (attrs.notes) {
      affectNotes(attrs.notes);
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

export const App = () => {
  useEffect(setupSynchronization, []);
  // return <Dev2PianoRollEditorView />;
  return (
    <div className="bg-white">
      <div className="w-[420px] h-[240px] border border-cyan-600 bg-blue-100/20 flex-c">
        <div className="flex-v gap-2">
          <ControlsSection />
          <PianoRollEditorView />
          <BottomBar />
        </div>
      </div>
    </div>
  );
};
