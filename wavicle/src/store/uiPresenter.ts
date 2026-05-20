import { asyncRerender } from "alumina";
import { appConfig, appEnv, ILanguageKey, INumberDirection } from "@/base";
import { animateValue, IValueAnimator } from "@/funcs";
import { nums } from "@/funcs/utils";
import { ISynthesizerEngine } from "@/synthLib";
import { keysBlockHelpers } from "@/ui/organisms";

function mapDbToLevel01(dbValue: number) {
  return nums.lerpMap(dbValue, -80, -3, 0, 1, true);
}

function findNearestLowerValue(current: number, values: number[]) {
  for (let i = values.length - 1; i >= 0; i--) {
    const value = values[i];
    if (value < current) {
      return value;
    }
  }
}

function findNearestHigherValue(current: number, values: number[]) {
  return values.find((value) => value > current);
}

export function createUiPresenter(synthEngine: ISynthesizerEngine) {
  const octaveOffsets = appConfig.octaveSelectionKeyUnitOffsets;
  let outputLevelTimerId = undefined as
    | ReturnType<typeof setInterval>
    | undefined;
  const state = {
    keyRangeOffset: appConfig.activeKeyRangeUnitOffsetDefault,
    keysRangeSize: appConfig.activeKeyRangeUnitSize,
    languageKey: (appEnv.isJapaneseEnvironment ? "ja" : "en") as ILanguageKey,
    isCompactMode: localStorage.getItem("wavicle_is_compact_mode") === "1",
    usagePanelVisible: false,
    outputLevel01: 0,
  };
  const readers = {
    get currentInstrumentIndex() {
      const { allInstrumentKeys, currentInstrumentKey } = synthEngine;
      return allInstrumentKeys.indexOf(currentInstrumentKey);
    },
    get canShiftInstrumentPrev() {
      const index = readers.currentInstrumentIndex;
      return index > 0;
    },
    get canShiftInstrumentNext() {
      const { allInstrumentKeys } = synthEngine;
      const index = readers.currentInstrumentIndex;
      return index < allInstrumentKeys.length - 1;
    },
    get canShiftKeysOffsetLower() {
      return state.keyRangeOffset > octaveOffsets[0];
    },
    get canShiftKeysOffsetHigher() {
      return state.keyRangeOffset < octaveOffsets[octaveOffsets.length - 1];
    },
    get pcKeyboardRootNoteNumber() {
      const offset =
        findNearestLowerValue(state.keyRangeOffset + 3.5, octaveOffsets) || 0;
      return keysBlockHelpers.getNoteNumberFormKeyOffset(
        offset,
        appConfig.bottomNoteNumber,
      );
    },
    get needUserActionForAudioOutput() {
      return !synthEngine.webAudioInitialized && synthEngine.noteReceived;
    },
  };

  let scrollAnimator: IValueAnimator | undefined;
  const actions = {
    initialize() {
      outputLevelTimerId = setInterval(() => {
        const nextOutputLevel01 = mapDbToLevel01(
          synthEngine.readOutputLevelDb(),
        );
        if (Math.abs(state.outputLevel01 - nextOutputLevel01) < 0.01) {
          return;
        }
        state.outputLevel01 = nextOutputLevel01;
        asyncRerender();
      }, 50);
    },
    finalize() {
      if (outputLevelTimerId) {
        clearInterval(outputLevelTimerId);
        outputLevelTimerId = undefined;
      }
    },
    setKeyRangeOffset(value: number) {
      state.keyRangeOffset = value;
    },
    shiftInstrument(dir: INumberDirection) {
      const index = readers.currentInstrumentIndex;
      if (index >= 0) {
        const { allInstrumentKeys } = synthEngine;
        const nextIndex = index + dir;
        const newInstrumentKey = allInstrumentKeys[nextIndex];
        if (newInstrumentKey) {
          synthEngine.setInstrument(newInstrumentKey, true);
        }
      }
    },
    shiftOctave(dir: INumberDirection) {
      scrollAnimator?.flush();
      const currentOffset = state.keyRangeOffset;
      const finderFn =
        dir === 1 ? findNearestHigherValue : findNearestLowerValue;
      const nextOffset = finderFn(currentOffset, octaveOffsets);
      if (nextOffset !== undefined) {
        scrollAnimator = animateValue(
          actions.setKeyRangeOffset,
          currentOffset,
          nextOffset,
          500,
        );
      }
    },
    setLanguageKey(languageKey: ILanguageKey) {
      if (appEnv.isJapaneseEnvironment) {
        state.languageKey = languageKey;
      }
    },
    setCompactMode(isCompact: boolean) {
      state.isCompactMode = isCompact;
      localStorage.setItem("wavicle_is_compact_mode", isCompact ? "1" : "0");
    },
    showUsagePanel() {
      state.usagePanelVisible = true;
    },
    hideUsagePanel() {
      state.usagePanelVisible = false;
    },
  };
  return { state, readers, actions };
}

export type IUiPresenter = ReturnType<typeof createUiPresenter>;
