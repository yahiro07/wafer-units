import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterfaceForModule("wafer-v01", import.meta.url);
const engine = createSequencerEngine(unitInterface);

type ClockAnchor = {
  timeFrom: number;
  barFrom: number;
  bpm: number;
};

export function setupUnit() {
  const st = store.state;
  engine.setOctave(st.octave);
  engine.setDuty(st.duty);
  engine.setLoopBars(st.loopBars);
  engine.setNotes(st.notes);

  let clockAnchor: ClockAnchor | null = null;

  const noteOutputPort = unitInterface?.createNoteOutputPort();

  function getFloatStepPositionFromTime(time: number) {
    const ac = unitInterface?.audioContext;
    if (!ac || !clockAnchor) return undefined;
    if (time <= 0) {
      time = ac.currentTime;
    }
    const unitDuration = 60 / clockAnchor.bpm / 4;
    return (
      clockAnchor.barFrom * 16 + (time - clockAnchor.timeFrom) / unitDuration
    );
  }

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      // viewSize: [800, 450],
    },
    clockHandlers: {
      start() {
        clockAnchor = null;
        engine.start();
      },
      stop() {
        engine.stop();
        store.setPlayPos(null);
        clockAnchor = null;
      },
      processScheduling(timeFrom, barFrom, _barTo, bpm) {
        const stepPos = barFrom * 16;
        const playPosTotalSteps = Math.max(st.loopBars * 16, 32);
        const playPos = stepPos % playPosTotalSteps;
        store.setPlayPos(playPos);
        clockAnchor = { timeFrom, barFrom, bpm };
      },
      processStep(stepIndex, time, unitDuration) {
        engine.processStep(stepIndex, time, unitDuration);
      },
    },
    noteInput: {
      noteOn(noteNumber, time, velocity) {
        console.log("noteOn", noteNumber, time, velocity);
        const stepPos = getFloatStepPositionFromTime(time ?? 0);
        console.log("stepPos", stepPos);
        if (stepPos !== undefined) {
          const loopSteps = store.state.loopBars * 16;
          const si = Math.round(stepPos) % loopSteps;
          console.log("si", si);
        }

        noteOutputPort?.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        noteOutputPort?.noteOff(noteNumber);
      },
    },
    // persistence: persistence,
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
