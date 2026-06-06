import {
  createSequencerTickDriver,
  setupMidiKeyboardInput,
} from "mofus/mx-audio";
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
  setupUnitInterface() {
    unitInterface?.completeSetup({
      unitAspects: {
        unitType: "sequencer",
        categoryHint: "stepSequencer",
        outputs: ["note"],
        inputs: ["clock"],
      },
      primaryInputPortHandlers: {
        clockInput: {
          start() {
            uiActions.setExPlaying(true);
          },
          stop() {
            uiActions.setExPlaying(false);
            sequencerEngine.allNotesOff();
          },
          processStep: drivers.wrapProcessStep,
        },
        stateInput: {
          emitStateBytes: persistence.emitStateBytes,
          applyStateBytes: persistence.applyStateBytes,
        },
      },
      hostCallbacks: {
        setBpm(bpm) {
          uiActions.setBpm(bpm);
        },
      },
    });
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
    drivers.setupUnitInterface();
    drivers.setupTickDriver();
    drivers.setupMidiKeyboardInput();
  },
};
