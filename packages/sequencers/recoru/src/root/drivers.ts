import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { Note } from "@/root/model";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterfaceForModule("wafer-v01", import.meta.url);
const engine = createSequencerEngine(unitInterface);

const recordingActions = {
  addNote(note: Note) {
    store.setNotes((prev) => [...prev, note]);
  },
  patchNote(noteId: number, attrs: Partial<Note>) {
    store.setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, ...attrs } : note)),
    );
  },
  removeNote(noteId: number) {
    store.setNotes((prev) => prev.filter((note) => note.id !== noteId));
  },
};

function createNote(noteNumber: number, position: number): Note {
  const nextId = Math.max(0, ...store.state.notes.map((note) => note.id)) + 1;
  return {
    id: nextId,
    channel: 0,
    pitch: noteNumber,
    position,
    duration: 1,
  };
}

type ClockAnchor = {
  timeFrom: number;
  barFrom: number;
  bpm: number;
};

type TemporalNoteInfo = {
  noteId: number;
  noteOnRawStepPos: number;
};

function createRecorderEngine() {
  const noteOutputPort = unitInterface?.createNoteOutputPort();
  let clockAnchor: ClockAnchor | null = null;
  const tempNoteMap: Map<number, TemporalNoteInfo> = new Map();

  const internal = {
    getFloatStepPositionFromTime(time: number) {
      const ac = unitInterface?.audioContext;
      if (!ac || !clockAnchor) return undefined;
      if (time <= 0) {
        time = ac.currentTime;
      }
      const unitDuration = 60 / clockAnchor.bpm / 4;
      return (
        clockAnchor.barFrom * 16 + (time - clockAnchor.timeFrom) / unitDuration
      );
    },
  };

  return {
    setClockAnchor(_clockAnchor: ClockAnchor | null) {
      clockAnchor = _clockAnchor;
    },
    noteOn(noteNumber: number, time: number, velocity: number) {
      console.log("noteOn", noteNumber, time, velocity);
      const stepPos = internal.getFloatStepPositionFromTime(time ?? 0);
      console.log("stepPos", stepPos);
      if (stepPos !== undefined) {
        const loopSteps = store.state.loopBars * 16;
        const si = Math.round(stepPos) % loopSteps;
        console.log("si", si);
        const note = createNote(noteNumber, si);
        recordingActions.addNote(note);
        tempNoteMap.set(noteNumber, {
          noteId: note.id,
          noteOnRawStepPos: stepPos,
        });
      }

      noteOutputPort?.noteOn(noteNumber);
    },
    noteOff(noteNumber: number, time: number) {
      noteOutputPort?.noteOff(noteNumber);
      const noteInfo = tempNoteMap.get(noteNumber);
      if (noteInfo) {
        const stepPos = internal.getFloatStepPositionFromTime(time ?? 0);
        if (stepPos !== undefined) {
          const duration = Math.round(stepPos - noteInfo.noteOnRawStepPos);
          if (duration >= 1) {
            recordingActions.patchNote(noteInfo.noteId, { duration });
          } else {
            recordingActions.removeNote(noteInfo.noteId);
          }
        }
        tempNoteMap.delete(noteNumber);
      }
    },
  };
}

export function setupUnit() {
  const st = store.state;
  engine.setOctave(st.octave);
  engine.setDuty(st.duty);
  engine.setLoopBars(st.loopBars);
  engine.setNotes(st.notes);

  const recorder = createRecorderEngine();

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      // viewSize: [800, 450],
    },
    clockHandlers: {
      start() {
        recorder.setClockAnchor(null);
        engine.start();
      },
      stop() {
        engine.stop();
        store.setPlayPos(null);
        recorder.setClockAnchor(null);
      },
      processScheduling(timeFrom, barFrom, _barTo, bpm) {
        const stepPos = barFrom * 16;
        const playPosTotalSteps = Math.max(st.loopBars * 16, 64);
        const playPos = stepPos % playPosTotalSteps;
        store.setPlayPos(playPos);
        recorder.setClockAnchor({ timeFrom, barFrom, bpm });
      },
      processStep(stepIndex, time, unitDuration) {
        engine.processStep(stepIndex, time, unitDuration);
      },
    },
    noteInput: {
      noteOn: recorder.noteOn,
      noteOff: recorder.noteOff,
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
