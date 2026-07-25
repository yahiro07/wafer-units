import { queryUnitInterface } from "wafer-host/unit-types";
import { buildPresetNotesForLoop, presets } from "@/root/model";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

const affectNotesToSequencer = () => {
  const st = store.state;
  const preset = presets[st.presetIndex];
  const notes = buildPresetNotesForLoop(
    preset,
    preset.stepLength,
    st.degreeFlags,
  );
  engine.setNotes(notes, preset.stepLength);
};

export function setupUnit() {
  affectNotesToSequencer();
  engine.setOctave(store.state.octave);
  engine.setDuty(store.state.duty);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [750, 450],
    },
    clockHandlers: {
      start() {
        engine.start();
      },
      stop() {
        engine.stop();
        store.setPlayPos(null);
      },
      processStep(stepIndex, time, unitDuration) {
        engine.processStep(stepIndex, time, unitDuration);
        store.setPlayPos(stepIndex % 32);
      },
    },
    noteInput: {
      noteOn(noteNumber) {
        engine.setRootNoteNumber(noteNumber);
      },
      noteOff() {},
    },
    hostCallbacks: {
      setKeyTranspose(keyTranspose) {
        engine.setKeyTranspose(keyTranspose);
      },
    },
    // persistence,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ presetIndex, degreeFlags, octave, duty }) => {
    if (presetIndex !== undefined || degreeFlags !== undefined) {
      affectNotesToSequencer();
    }
    if (octave !== undefined) {
      engine.setOctave(octave);
    }
    if (duty !== undefined) {
      engine.setDuty(duty);
    }
  });
}
