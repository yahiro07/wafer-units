import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

export function setupUnit() {
  const st = store.state;
  engine.setOctave(st.octave);
  engine.setDuty(st.duty);
  engine.setLoopBars(st.loopBars);
  engine.setNotes(st.notes);

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
      processScheduling(timeFrom, barFrom, barTo, bpm) {
        const stepPos = barFrom * 16;
        const playPosTotalSteps = Math.max(st.loopBars * 16, 32);
        store.setPlayPos(stepPos % playPosTotalSteps);
      },
      processStep(stepIndex, time, unitDuration) {
        engine.processStep(stepIndex, time, unitDuration);
      },
    },
    // persistence,
  });
}

export function setupSynchronization() {
  return store.subscribe(
    ({ notes, previewNotePitch, octave, duty, loopBars }) => {
      if (notes !== undefined) {
        engine.setNotes(notes);
      }
      if (loopBars !== undefined) {
        engine.setLoopBars(loopBars);
      }
      if (previewNotePitch !== undefined) {
        if (previewNotePitch !== null) {
          engine.previewNoteOn(previewNotePitch);
        } else {
          engine.previewNoteOff();
        }
      }
      if (octave !== undefined) {
        engine.setOctave(octave);
      }
      if (duty !== undefined) {
        engine.setDuty(duty);
      }
    },
  );
}
