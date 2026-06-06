import { createStore } from "solid-js/store";
import { getUnitInterface } from "wus-unit-types";
import { createAppSynthTarget } from "@/sequencer/app-synth-target";
import { createSequencerEngine, StepCode } from "@/sequencer/sequencer-engine";

export const unitInterface = getUnitInterface("wus-v02");
const appSynthTarget = createAppSynthTarget(unitInterface);
export const sequencerEngine = createSequencerEngine(appSynthTarget);

type StoreState = {
  bpm: number;
  playing: boolean;
  duty: number;
  stepCodes: StepCode[];
  currentStepIndex: number | null;
  noteNumber: number;
  exPlaying: boolean;
};

export type PersistedState = {
  duty: number;
  stepCodes: StepCode[];
};

export const [appState, setAppState] = createStore<StoreState>({
  bpm: 110,
  playing: false,
  duty: 0.5,
  stepCodes: ["off", "on", "on", "on"],
  currentStepIndex: null,
  noteNumber: 24 + 9,
  exPlaying: false,
});

function sendInitialStates() {
  sequencerEngine.setBpm(appState.bpm);
  sequencerEngine.setDuty(appState.duty);
  sequencerEngine.setStepCodes(appState.stepCodes);
  sequencerEngine.setNoteNumber(appState.noteNumber);
}
sendInitialStates();

export const appReaders = {
  somePlaying: () => appState.playing || appState.exPlaying,
};

export const uiActions = {
  async noteOn(noteNumber: number) {
    await appSynthTarget.resumeIfNeed();
    appSynthTarget.noteOn(noteNumber);
    sequencerEngine.setNoteNumber(noteNumber);
  },
  noteOff(noteNumber: number) {
    appSynthTarget.noteOff(noteNumber);
  },
  setBpm(bpm: number) {
    setAppState("bpm", bpm);
    sequencerEngine.setBpm(bpm);
  },
  setPlaying(playing: boolean) {
    setAppState("playing", playing);
    if (!playing) {
      setAppState("currentStepIndex", null);
    }
  },
  setDuty(duty: number) {
    setAppState("duty", duty);
    sequencerEngine.setDuty(duty);
  },
  setStepCode(index: number, code: StepCode) {
    const stepCodes = [...appState.stepCodes];
    stepCodes[index] = code;
    setAppState("stepCodes", stepCodes);
    sequencerEngine.setStepCodes([...stepCodes]);
  },
  setNoteNumber(noteNumber: number) {
    setAppState("noteNumber", noteNumber);
    sequencerEngine.setNoteNumber(noteNumber);
  },
  setExPlaying(exPlaying: boolean) {
    setAppState("exPlaying", exPlaying);
  },
  setCurrentStepIndex(stepIndex: number | null) {
    setAppState("currentStepIndex", stepIndex);
  },
  loadStepCodes(codes: StepCode[]) {
    setAppState("stepCodes", codes);
    sequencerEngine.setStepCodes(codes);
  },
};
