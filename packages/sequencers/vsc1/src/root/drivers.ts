import { createSequencer } from "@/engine/sequencer";
import { createSequencerTickDriver } from "@/utils/sequencer-tick-driver";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { filterObjectValuesNonUndefined } from "@/utils/helpers";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";
import { createSynthesizer } from "@/engine/synthesizer";

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();

const synthesizer = createSynthesizer(unitInterface, audioContext);
const sequencer = createSequencer(unitInterface, synthesizer, audioContext);
const sequencerTickDriver = createSequencerTickDriver(audioContext);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [1048, 538],
    },
    hostCallbacks: {
      setBpm(bpm) {
        actions.setBpm(bpm);
      },
    },
    clockHandlers: {
      start() {
        store.setHostPlaying(true);
        sequencer.start();
      },
      processStep(stepIndex, time, unitDuration) {
        sequencer.step(stepIndex, time, unitDuration);
      },
      stop() {
        store.setHostPlaying(false);
        sequencer.stop();
      },
    },
    noteInput: {
      noteOn: synthesizer.noteOn,
      noteOff: synthesizer.noteOff,
    },
    cleanup() {
      synthesizer.cleanup();
      sequencer.cleanup();
    },
  });
}

function setupSynchronization() {
  const unsubscribeStore = store.subscribe((attrs) => {
    const {
      stepNotes,
      stepModifierFlags,
      alterPatternsEnabled,
      twiddleKnobsEnabled,
      bpm,
      standalonePlaying,
      previewNoteNumber,
    } = attrs;
    const sequencerAttrs = filterObjectValuesNonUndefined({
      stepNotes,
      stepModifierFlags,
      alterPatternsEnabled,
      twiddleKnobsEnabled,
    });
    if (Object.keys(sequencerAttrs).length > 0) {
      sequencer.patchEditState(sequencerAttrs);
    }
    if (bpm !== undefined) {
      // synthesizer.setBpm(bpm);
      sequencerTickDriver.setBpm(bpm);
    }

    if (previewNoteNumber !== undefined) {
      if (previewNoteNumber >= 0) {
        synthesizer.noteOn(previewNoteNumber);
      } else {
        synthesizer.noteOff(-1);
      }
    }

    if (standalonePlaying !== undefined) {
      if (standalonePlaying) {
        sequencerTickDriver.start({
          start: sequencer.start,
          processStep: sequencer.step,
          stop: sequencer.stop,
        });
      } else {
        sequencerTickDriver.stop();
      }
    }
  }, true);

  const unsubscribeSequencer = sequencer.setListener({
    setPlayPosition(stepIndex) {
      store.setPlayPosition(stepIndex);
    },
  });

  let unsubscribeMidiIn: (() => void) | undefined;

  if (!unitInterface) {
    unsubscribeMidiIn = setupMidiKeyboardInput({
      noteOn(noteNumber) {
        synthesizer.noteOn(noteNumber, audioContext.currentTime);
      },
      noteOff(noteNumber) {
        synthesizer.noteOff(noteNumber, audioContext.currentTime);
      },
    });
  }
  return () => {
    unsubscribeStore();
    unsubscribeSequencer();
    unsubscribeMidiIn?.();
  };
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
