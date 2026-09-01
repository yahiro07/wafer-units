import { createSequencer } from "@/engine/sequencer";
import { createSequencerTickDriver } from "@/utils/sequencer-tick-driver";
import { createSynthesizer } from "@/engine/synthesizer";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { filterObjectValuesNonUndefined } from "@/utils/helpers";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();

const synthesizer = createSynthesizer(unitInterface, audioContext);
const sequencer = createSequencer(audioContext, synthesizer);
const sequencerTickDriver = createSequencerTickDriver(audioContext);

synthesizer.setParameters(store.state.synthParameters);

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [1048, 583],
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
      synthParameters,
      stepNotes,
      stepModifierFlags,
      alterPatternsEnabled,
      twiddleKnobsEnabled,
      bpm,
      standalonePlaying,
    } = attrs;
    if (synthParameters !== undefined) {
      synthesizer.setParameters(synthParameters);
    }
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
