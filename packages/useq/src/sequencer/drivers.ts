import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { createSequencerTickDriver } from "beams/mx-audio/sequencer-tick-driver";
import { createEffect, onCleanup } from "solid-js";
import { persistence } from "@/store/persistence";
import {
  appState,
  sequencerEngine,
  uiActions,
  unitInterface,
} from "@/store/store";

export const drivers = {
  wrapProcessStep(stepIndex: number) {
    sequencerEngine.processOnStep(stepIndex % 4);
    uiActions.setCurrentStepIndex(stepIndex % 4);
  },
  setupHostInterface() {
    if (unitInterface) {
      unitInterface.declareUnitFeatures({
        type: "sequencer",
        categoryHint: "stepSequencer",
        outputs: ["note"],
        inputs: ["clock"],
      });
      unitInterface.setHostCallbacks({
        setBpm(bpm) {
          uiActions.setBpm(bpm);
        },
        setPlayState(playing) {
          uiActions.setExPlaying(playing);
          if (!playing) {
            sequencerEngine.allNotesOff();
          }
        },
      });
      unitInterface.primaryInputPort.setHandlers({
        clockInput: { processStep: drivers.wrapProcessStep },
        stateInput: {
          emitStateBytes: persistence.emitStateBytes,
          applyStateBytes: persistence.loadStateBytes,
        },
      });
      unitInterface.completeSetup();
    }
  },
  setupTickDriver() {
    const tickDriver = createSequencerTickDriver();
    createEffect(() => {
      tickDriver.setBpm(appState.bpm);
    });
    createEffect(() => {
      const playing = appState.playing;
      if (playing) {
        tickDriver.start({ processStep: drivers.wrapProcessStep });
      } else {
        tickDriver.stop();
        sequencerEngine.allNotesOff();
      }
    });
  },
  setupMidiKeyboardInput() {
    if (!unitInterface) {
      const cleanup = setupMidiKeyboardInput({
        noteOn: uiActions.noteOn,
        noteOff: uiActions.noteOff,
      });
      onCleanup(cleanup);
    }
  },
  setupAll() {
    drivers.setupHostInterface();
    drivers.setupTickDriver();
    drivers.setupMidiKeyboardInput();
  },
};
