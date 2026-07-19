import {
  createSequencerTickDriver,
  setupMidiKeyboardInput,
} from "mofur/mx-audio";
import { createSequencerEngine } from "@/sequencer/sequencer-engine";
import {
  createTargetSynthesizer,
  unitInterface,
} from "@/sequencer/target-synthesizer";
import { actions } from "@/store/actions";
import { persistence } from "@/store/persistence";
import { getLoopStepCount } from "@/store/steps-helper";
import { store } from "@/store/store";

const targetSynth = createTargetSynthesizer();
const sequencerEngine = createSequencerEngine(targetSynth);
const standaloneTickDriver = createSequencerTickDriver();

const driversInternal = {
  wrapProcessStep(stepIndex: number) {
    sequencerEngine.processOnStep(stepIndex);
    const loopSteps = getLoopStepCount(store.state.loopBars);
    actions.setPlayPos(stepIndex % loopSteps);
  },
};
export const drivers = {
  setupUnitInterface() {
    unitInterface?.completeSetup({
      unitAspects: {
        unitType: "sequencer",
        categoryHint: "stepSequencer",
      },
      noteInput: {
        noteOn: actions.inputNoteOn,
        noteOff: actions.inputNoteOff,
      },
      clockHandlers: {
        start() {
          actions.setExPlaying(true);
        },
        processStep(stepIndex) {
          driversInternal.wrapProcessStep(stepIndex);
        },
        stop() {
          actions.setExPlaying(false);
          sequencerEngine.allNotesOff();
        },
      },
      persistence,
      hostCallbacks: {
        setBpm(bpm) {
          actions.setBpm(bpm);
        },
      },
    });
  },
  setupMidiKeyboardInput() {
    if (!unitInterface) {
      return setupMidiKeyboardInput({
        async noteOn(noteNumber) {
          await actions.resumeAudioContext();
          actions.inputNoteOn(noteNumber);
        },
        async noteOff(noteNumber) {
          actions.inputNoteOff(noteNumber);
        },
      });
    }
  },
  setupStateSynchronization() {
    sequencerEngine.setAttributes({
      bpm: store.state.bpm,
      loopBars: store.state.loopBars,
      allSteps: store.state.allSteps,
      octaveShift: store.state.octaveShift,
      stepDuty: store.state.stepDuty,
    });
    standaloneTickDriver.setBpm(store.state.bpm);

    return store.subscribe((attrs) => {
      const {
        allSteps,
        previewNote,
        loopBars,
        octaveShift,
        stepDuty,
        stdPlaying,
        bpm,
      } = attrs;
      if (allSteps !== undefined) {
        sequencerEngine.setAttributes({ allSteps });
      }
      if (previewNote !== undefined) {
        sequencerEngine.emitPreviewNote(previewNote);
      }
      if (loopBars !== undefined) {
        sequencerEngine.setAttributes({ loopBars });
      }
      if (octaveShift !== undefined) {
        sequencerEngine.setAttributes({ octaveShift });
      }
      if (stepDuty !== undefined) {
        sequencerEngine.setAttributes({ stepDuty });
      }
      if (stdPlaying !== undefined) {
        if (stdPlaying) {
          standaloneTickDriver.setBpm(store.state.bpm);
          standaloneTickDriver.start({
            processStep: driversInternal.wrapProcessStep,
          });
        } else {
          standaloneTickDriver.stop();
          sequencerEngine.allNotesOff();
        }
      }
      if (bpm !== undefined) {
        sequencerEngine.setAttributes({ bpm });
        standaloneTickDriver.setBpm(bpm);
      }
    });
  },
  setupAll() {
    drivers.setupUnitInterface();
    const unsubscribeStore = drivers.setupStateSynchronization();
    const closeMidiIn = drivers.setupMidiKeyboardInput();
    return () => {
      unsubscribeStore();
      closeMidiIn?.();
    };
  },
};
