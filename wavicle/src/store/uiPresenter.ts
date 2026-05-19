import { appConfig, appEnv, ILanguageKey, INumberDirection } from '~/base';
import { animateValue, IValueAnimator } from '~/funcs';
import { ISynthesizerEngine } from '~/synthLib';
import { keysBlockHelpers } from '~/ui/organisms';

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
  const state = {
    keyRangeOffset: appConfig.activeKeyRangeUnitOffsetDefault,
    keysRangeSize: appConfig.activeKeyRangeUnitSize,
    languageKey: (appEnv.isJapaneseEnvironment ? 'ja' : 'en') as ILanguageKey,
    usagePanelVisible: false,
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
        appConfig.bottomNoteNumber
      );
    },
    get needUserActionForAudioOutput() {
      return !synthEngine.webAudioInitialized && synthEngine.noteReceived;
    },
  };

  let scrollAnimator: IValueAnimator | undefined;
  const actions = {
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
          500
        );
      }
    },
    setLanguageKey(languageKey: ILanguageKey) {
      if (appEnv.isJapaneseEnvironment) {
        state.languageKey = languageKey;
      }
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
