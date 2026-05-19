import { asyncRerender } from 'alumina';
import { IInstrumentKey } from '~/base';
import { arrays } from '~/funcs';
import { createInstrumentProvider } from './instrumentProvider';
import { createPitchShiftedNoteVoice } from './noteVoice';
import { createNoteVoiceManager } from './noteVoiceManager';
import { IInstrumentData, IInstrumentParameters } from './types';

export interface ISynthesizerEngine {
  allInstrumentKeys: IInstrumentKey[];
  masterVolume: number;
  instrumentParameters: IInstrumentParameters;
  isLoadingSamples: boolean;
  holdNoteNumbers: number[];
  currentInstrumentKey: IInstrumentKey;
  webAudioInitialized: boolean;
  noteReceived: boolean;
  initialize(): void;
  activateWebAudioOnUserAction(): void;
  setMasterVolume(value: number): void;
  setInstrumentParameter(key: keyof IInstrumentParameters, value: number): void;
  preloadAllInstrumentSamples(): Promise<void>;
  setInstrument(
    instrumentKey: IInstrumentKey,
    updateReleaseParam: boolean
  ): void;
  noteOn(noteNumber: number, velocity?: number): void;
  noteOff(noteNumber: number): void;
  finalize(): void;
}

function createNoteKey(noteNumber: number): string {
  return `note-${noteNumber}`;
}

export function createSynthesizerEngine(): ISynthesizerEngine {
  const audioContext = new AudioContext();
  const instrumentProvider = createInstrumentProvider(audioContext);
  const { allInstrumentKeys } = instrumentProvider;

  const noteVoiceManager = createNoteVoiceManager();
  const voiceMixer = audioContext.createGain();
  const compressor = audioContext.createDynamicsCompressor();

  voiceMixer.connect(compressor).connect(audioContext.destination);

  let timerId = undefined as NodeJS.Timeout | undefined;
  let masterVolume = 1;
  let isLoadingSamples = false;
  let instrumentData: IInstrumentData | undefined;
  let currentInstrumentKey = allInstrumentKeys[0];
  let webAudioInitialized = false;
  let noteReceived = false;

  const holdNoteNumbers: number[] = [];
  const instrumentParameters: IInstrumentParameters = {
    volume: 0.5,
    release: 0.4,
  };

  function updateMasterMixerLevel() {
    voiceMixer.gain.value = masterVolume;
  }

  const self: ISynthesizerEngine = {
    allInstrumentKeys: instrumentProvider.allInstrumentKeys,
    get masterVolume() {
      return masterVolume;
    },
    setMasterVolume(value) {
      masterVolume = value;
      updateMasterMixerLevel();
    },
    get currentInstrumentKey() {
      return currentInstrumentKey;
    },
    get webAudioInitialized() {
      return webAudioInitialized;
    },
    get noteReceived() {
      return noteReceived;
    },
    instrumentParameters,
    holdNoteNumbers,
    setInstrumentParameter(key, value) {
      instrumentParameters[key] = value;
    },
    initialize() {
      updateMasterMixerLevel();
      timerId = setInterval(() => noteVoiceManager.updateVoices(), 50);
    },
    activateWebAudioOnUserAction() {
      if (!webAudioInitialized) {
        audioContext.resume();
        webAudioInitialized = true;
        console.log(`web audio started`);
        asyncRerender();
      }
    },
    get isLoadingSamples() {
      return isLoadingSamples;
    },
    async preloadAllInstrumentSamples() {
      return instrumentProvider.preloadAllInstrumentSamples();
    },
    async setInstrument(
      instrumentKey: IInstrumentKey,
      updateReleaseParam: boolean
    ) {
      currentInstrumentKey = instrumentKey;
      isLoadingSamples = true;
      const tmpInstrumentData = await instrumentProvider.loadInstrument(
        instrumentKey
      );
      isLoadingSamples = false;
      if (currentInstrumentKey !== instrumentKey) {
        return;
      }
      instrumentData = tmpInstrumentData;

      if (updateReleaseParam) {
        self.setInstrumentParameter('release', instrumentData.releaseParam);
      }
      asyncRerender();
    },
    noteOn(noteNumber, _velocity?: number) {
      if (!instrumentData) {
        return;
      }
      if (isLoadingSamples) {
        return;
      }
      const noteKey = createNoteKey(noteNumber);
      const { sampleSources, gainAdjustment } = instrumentData;
      const voice = createPitchShiftedNoteVoice(
        audioContext,
        noteNumber,
        sampleSources,
        instrumentParameters,
        gainAdjustment,
        voiceMixer
      );
      noteVoiceManager.noteOn(noteKey, voice);
      holdNoteNumbers.push(noteNumber);
      noteReceived = true;
    },
    noteOff(noteNumber) {
      const noteKey = createNoteKey(noteNumber);
      noteVoiceManager.noteOff(noteKey);
      arrays.remove(holdNoteNumbers, noteNumber);
    },
    finalize() {
      if (timerId) {
        clearInterval(timerId);
        timerId = undefined;
      }
    },
  };
  return self;
}
