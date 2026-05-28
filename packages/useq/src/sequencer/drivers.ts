import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { createSequencerTickDriver } from "beams/mx-audio/sequencer-tick-driver";
import { createEffect, onCleanup } from "solid-js";
import { persistence } from "@/store/persistence";
import {
  appState,
  hostInterface,
  sequencerEngine,
  uiActions,
} from "@/store/store";

export const drivers = {
  wrapProcessStep(stepIndex: number) {
    sequencerEngine.processOnStep(stepIndex % 4);
    uiActions.setCurrentStepIndex(stepIndex % 4);
  },
  setupHostInterface() {
    if (hostInterface) {
      hostInterface.setupUnitAgent({
        type: "sequencer",
        categoryHint: "stepSequencer",
        setBpm(bpm) {
          uiActions.setBpm(bpm);
        },
        setPlayState(playing) {
          uiActions.setExPlaying(playing);
          if (!playing) {
            sequencerEngine.allNotesOff();
          }
        },
        transportHandling: { processStep: drivers.wrapProcessStep },
        persistence: {
          emitStateBytes: persistence.emitStateBytes,
          loadStateBytes: persistence.loadStateBytes,
        },
      });
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
    if (!hostInterface) {
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
