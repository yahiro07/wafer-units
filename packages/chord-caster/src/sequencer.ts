import { ClockHandlers, UnitInterface } from "wafer-host/unit-types";
import { getChordRootNote } from "@/note-defs";
import { ProgressionState } from "@/types";

export function createProgressionCore(
  defaultState: ProgressionState,
  unitInterface: UnitInterface,
) {
  const state: ProgressionState = {
    songKey: defaultState.songKey,
    loopBars: defaultState.loopBars,
    relatives: [...defaultState.relatives],
  };
  let currentNote: number | null = null;

  const core = {
    emitSongKey() {
      unitInterface.emitMetaAttributes({ key: state.songKey });
    },
    playNote(note: number, time: number) {
      unitInterface.noteOutputPort.noteOn(note, time);
      currentNote = note;
    },
    stopCurrentNote(time: number) {
      if (currentNote !== null) {
        unitInterface.noteOutputPort.noteOff(currentNote, time);
        currentNote = null;
      }
    },
  };

  const clockHandlers: ClockHandlers = {
    preferSchedulingOrderInPriority: true,
    start() {
      core.emitSongKey();
    },
    stop() {
      core.stopCurrentNote(0);
    },
    processStep(stepIndex, time) {
      const currentBar = ((stepIndex / 16) >>> 0) % state.loopBars;
      const currentIndex = currentBar >>> (state.loopBars === 8 ? 1 : 0);
      const note = getChordRootNote(
        state.songKey,
        state.relatives[currentIndex],
      );
      if (note !== currentNote) {
        core.stopCurrentNote(time);
        core.playNote(note, time);
      }
    },
  };

  return {
    setState(attrs: Partial<ProgressionState>) {
      Object.assign(state, attrs);
      if (attrs.songKey) {
        unitInterface.emitMetaAttributes({ key: attrs.songKey });
      }
    },
    clockInput: clockHandlers,
  };
}
