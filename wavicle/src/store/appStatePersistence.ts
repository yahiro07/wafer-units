import { appConfig, IInstrumentKey, ILanguageKey } from '~/base';
import { nums } from '~/funcs';
import { IInstrumentParameters } from '~/synthLib';
import { appStore } from './appStore';

interface IAppStatePersistence {
  load(): void;
  save(): void;
}

type IAppPersistState = {
  midiInDeviceId: string;
  currentInstrumentKey: IInstrumentKey;
  instrumentParameters: IInstrumentParameters;
  languageKey: ILanguageKey;
  keyRangeOffset: number;
};

function createAppStatePersistence(): IAppStatePersistence {
  const localStorageKey = `wavicle__app_persist_state`;
  return {
    load() {
      const text = localStorage.getItem(localStorageKey);
      if (text) {
        try {
          const obj = JSON.parse(text) as IAppPersistState;
          const {
            midiInDeviceId,
            currentInstrumentKey,
            instrumentParameters,
            languageKey,
            keyRangeOffset,
          } = obj;
          const { synthEngine, midiInputDriver, uiPresenter } = appStore;

          const deviceExists = midiInputDriver.allDeviceEntries.some(
            (it) => it.id === midiInDeviceId
          );
          if (deviceExists) {
            midiInputDriver.selectDevice(midiInDeviceId);
          }
          const instrumentValid =
            synthEngine.allInstrumentKeys.includes(currentInstrumentKey);
          if (instrumentValid) {
            synthEngine.setInstrument(currentInstrumentKey, false);
          }
          const { volume, release } = instrumentParameters;
          if (nums.between(volume, 0, 1) && nums.between(release, 0, 1)) {
            synthEngine.setInstrumentParameter('volume', volume);
            synthEngine.setInstrumentParameter('release', release);
          }
          if (languageKey === 'en' || languageKey === 'ja') {
            uiPresenter.actions.setLanguageKey(languageKey);
          }
          const lo = appConfig.octaveSelectionKeyUnitOffsets[0];
          const hi =
            appConfig.octaveSelectionKeyUnitOffsets[
              appConfig.octaveSelectionKeyUnitOffsets.length - 1
            ];
          if (nums.between(keyRangeOffset, lo, hi)) {
            uiPresenter.actions.setKeyRangeOffset(keyRangeOffset);
          }
        } catch (error) {
          console.log(`failed to load persist state`);
        }
      }
    },
    save() {
      const { synthEngine, midiInputDriver, uiPresenter } = appStore;
      const midiInDeviceId = midiInputDriver.currentDeviceId;
      const { currentInstrumentKey, instrumentParameters } = synthEngine;
      const {
        state: { languageKey, keyRangeOffset },
      } = uiPresenter;
      const obj: IAppPersistState = {
        midiInDeviceId,
        currentInstrumentKey,
        instrumentParameters,
        languageKey,
        keyRangeOffset,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(obj));
    },
  };
}

export const appStatePersistence = createAppStatePersistence();
