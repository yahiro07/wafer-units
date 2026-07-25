import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

export function setupUnit() {
  engine.setOctave(store.state.octave);
  engine.setDuty(store.state.duty);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [800, 450],
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
  return store.subscribe(({ octave, duty }) => {
    // if (presetIndex !== undefined || degreeFlags !== undefined) {
    //   affectNotesToSequencer();
    // }
    if (octave !== undefined) {
      engine.setOctave(octave);
    }
    if (duty !== undefined) {
      engine.setDuty(duty);
    }
  });
}
