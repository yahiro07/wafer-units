import { mapUnaryTo } from "mofur/ax";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { resolveNotePitch } from "@/logic/resolve-note-pitch";
import { createUnitInterfaceDebugDummy } from "@/logic/unit-interface-debug-dummy";

export const unitInterface =
  queryUnitInterfaceForModule("wafer-v01", import.meta.url) ??
  createUnitInterfaceDebugDummy();
if (!unitInterface) {
  throw new Error("undefined unit interface");
}

type StepNote = {
  pitch: number;
  position: number;
  duration: number;
};

function createSequencer() {
  const state = {
    stepNotes: [] as StepNote[],
    octaveShift: 0,
    noteDuty: 0.9,
    loopBars: 2,
  };

  const { noteOutputPort } = unitInterface;

  const core = {
    processStep(stepIndex: number, time: number, unitDuration: number) {
      const loopLength = state.loopBars * 16;
      stepIndex %= loopLength;

      if (time === undefined || unitDuration === undefined) {
        //something wrong with the tick driver
        return;
      }

      const targetNotes = state.stepNotes.filter(
        (note) => note.position === stepIndex && note.duration > 0,
      );
      for (const note of targetNotes) {
        const shiftedNote = resolveNotePitch(note.pitch, state.octaveShift);
        const originalDuration = unitDuration * note.duration;
        const minDuration = unitDuration * 0.2;
        const duration = mapUnaryTo(
          state.noteDuty,
          minDuration,
          originalDuration,
        );
        noteOutputPort.noteOn(shiftedNote, time);
        noteOutputPort.noteOff(shiftedNote, time + duration);
      }
    },
  };

  return {
    setStepNotes(stepNotes: StepNote[]) {
      state.stepNotes = stepNotes;
    },
    processStep: core.processStep,
    allNotesOff() {},
    inputNoteOn(note: number, time: number, velocity: number) {
      noteOutputPort.noteOn(note, time, velocity);
    },
    inputNoteOff(note: number, time: number) {
      noteOutputPort.noteOff(note, time);
    },
    setAttrs(
      attrs: Partial<
        Pick<typeof state, "octaveShift" | "noteDuty" | "loopBars">
      >,
    ) {
      if (attrs.octaveShift !== undefined) {
        state.octaveShift = attrs.octaveShift;
      }
      if (attrs.noteDuty !== undefined) {
        state.noteDuty = attrs.noteDuty;
      }
      if (attrs.loopBars !== undefined) {
        state.loopBars = attrs.loopBars;
      }
    },
    setPreviewNote(_note: number | null) {},
  };
}

export const sequencer = createSequencer();
