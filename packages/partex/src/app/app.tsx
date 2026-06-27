import { pickObjectMembers } from "mofur/ax";
import { useEffect } from "react";
import { PageDev } from "@/app/page-dev";
import {
  deserializePersistState,
  serializePersistState,
} from "@/app/serializer";
import { CssVariablesFrame } from "@/components/ui-theme";
import { generateMappedNotes } from "@/logic/ghost-engine";
import { sequencer, unitInterface } from "@/logic/sequencer";
import { store } from "@/store/store";
import { BottomBar } from "./bottom-bar";
import { ControlsSection } from "./controls-section";
import { PianoRollEditorView } from "./piano-roll-editor-view";

function setupSynchronization() {
  sequencer.setAttrs({
    octaveShift: store.state.octaveShift,
    noteDuty: store.state.noteDuty,
    loopBars: store.state.loopBars,
  });

  const unsubscribeStore = store.subscribe((attrs) => {
    //ui states are affected to sequencer in reactive way
    if (attrs.mappedNotes) {
      sequencer.setStepNotes(attrs.mappedNotes);
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
    persistence: {
      emitStateBytes() {
        const state = pickObjectMembers(store.state, {
          inputNotes: 1,
          noteDuty: 1,
          octaveShift: 1,
          loopBars: 1,
          patternBars: 1,
          patternMode: 1,
          ghostEnabled: 1,
          realized: 1,
          songKey: 1,
        });
        return serializePersistState(state);
      },
      applyStateBytes(bytes) {
        const state = deserializePersistState(bytes);
        // console.log(`applyStateBytes`, bytes, state);
        if (!state) return;
        //to support state swapping at bar boundary while playing,
        //generated mapped notes here and affect it to sequencer in advance
        const { inputNotes, loopBars, patternBars, ghostEnabled, patternMode } =
          state;
        const mappedNotes = ghostEnabled
          ? generateMappedNotes(inputNotes, {
              loopBars,
              patternBars,
              patternMode,
            })
          : inputNotes;
        sequencer.setStepNotes(mappedNotes);

        //this also triggers mapped notes generation but it's asynchronous and delayed
        store.setState(state);
      },
    },
  });

  return unsubscribeStore;
}

function useGenerateMappedNotes() {
  const { inputNotes, loopBars, patternBars, ghostEnabled, patternMode } =
    store.useSnapshot();
  useEffect(() => {
    //usually mapped notes are generated when user edits notes or options
    const mappedNotes = ghostEnabled
      ? generateMappedNotes(inputNotes, { loopBars, patternBars, patternMode })
      : inputNotes;
    store.setMappedNotes(mappedNotes);
  }, [inputNotes, loopBars, patternBars, ghostEnabled, patternMode]);
}

export const App = () => {
  useEffect(setupSynchronization, []);
  useGenerateMappedNotes();
  return (
    <CssVariablesFrame>
      <div className="bg-white flex-vc">
        <div className="w-[620px] h-[380px] border border-cyan-600 bg-blue-100/20 flex-c">
          <div className="flex-vc gap-2">
            <ControlsSection />
            <PianoRollEditorView />
            <BottomBar />
          </div>
        </div>
        <PageDev />
      </div>
    </CssVariablesFrame>
  );
};
