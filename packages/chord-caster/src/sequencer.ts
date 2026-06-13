import { ClockHandlers, UnitInterface } from "wus-unit-types";
import { getChordRootNote } from "@/note-defs";
import { DynamicPatternInput, ProgressionState } from "@/types";

export function createProgressionCore(
  defaultState: ProgressionState,
  unitInterface: UnitInterface,
) {
  const state = defaultState;

  function emitPatternInput(data: DynamicPatternInput) {
    // console.log("emitting", data.key, data.chordRootNote);
    unitInterface.emitMetaAttributes({ dynamicPatternInput: data });
  }

  function emitPatternInputFromState(index: number, withKey?: boolean) {
    const { key, relatives } = state;
    const chordRootNote = getChordRootNote(key, relatives[index]);
    emitPatternInput({ key: withKey ? key : undefined, chordRootNote });
  }

  let prevIndex = -1;

  const clockHandlers: ClockHandlers = {
    start() {
      emitPatternInputFromState(0, true);
      prevIndex = 0;
    },
    stop() {},
    processScheduling(_startTime, _ppqFrom, ppqTo, _bpm) {
      //480ppq
      const currentBar = Math.floor((ppqTo / (480 * 4)) % state.loopBars);
      const currentIndex = currentBar >>> (state.loopBars === 8 ? 1 : 0);
      if (currentIndex !== prevIndex) {
        emitPatternInputFromState(currentIndex);
      }
      prevIndex = currentIndex;
    },
  };

  return {
    setState(attrs: Partial<ProgressionState>) {
      Object.assign(state, attrs);
      if (attrs.key) {
        unitInterface.emitMetaAttributes({ key: attrs.key });
      }
    },
    clockInput: clockHandlers,
  };
}
