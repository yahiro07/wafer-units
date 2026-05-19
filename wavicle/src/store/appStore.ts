import {
  createMidiInputDriver,
  IMidiInputDriver,
  setupPcKeyboardHandler,
} from '../periphery';
import { createSynthesizerEngine, ISynthesizerEngine } from '../synthLib';
import { createUiPresenter, IUiPresenter } from './uiPresenter';

interface IAppStore {
  initialize(): Promise<void>;
  synthEngine: ISynthesizerEngine;
  midiInputDriver: IMidiInputDriver;
  uiPresenter: IUiPresenter;
}

function createAppStore(): IAppStore {
  const synthEngine = createSynthesizerEngine();
  const midiInputDriver = createMidiInputDriver(synthEngine);
  const uiPresenter = createUiPresenter(synthEngine);
  return {
    synthEngine,
    midiInputDriver,
    uiPresenter,
    async initialize() {
      synthEngine.initialize();
      synthEngine.setInstrument(synthEngine.currentInstrumentKey, false); // initial load
      setupPcKeyboardHandler(synthEngine, {
        getRootNoteNumber() {
          return uiPresenter.readers.pcKeyboardRootNoteNumber;
        },
      });
      await midiInputDriver.initialize();
    },
  };
}
export const appStore = createAppStore();
