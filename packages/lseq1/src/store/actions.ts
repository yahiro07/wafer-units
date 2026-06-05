import { seqNumbers } from "mofur/ax";
import { getLoopStepCount } from "@/store/steps-helper";
import { store } from "@/store/store";
import { SpecialStep } from "@/types";

const actionsDi = {
  resumeAudioContextFn: undefined as (() => Promise<void>) | undefined,
};

export const actions = {
  setPlayPos(playPos: number) {
    store.setPlayPos(playPos);
  },
  shiftBar(dir: -1 | 1) {
    const { loopBars } = store.state;
    const loopSteps = getLoopStepCount(loopBars);
    store.setEditPos((prev) => {
      return (prev + dir * 16 + loopSteps) % loopSteps;
    });
  },
  shiftStep(dir: -1 | 1) {
    const { loopBars, stepStride } = store.state;
    const loopSteps = getLoopStepCount(loopBars);
    store.setEditPos((prev) => {
      return (prev + dir * stepStride + loopSteps) % loopSteps;
    });
  },
  putStepValue(value: number) {
    const { editPos: currentStep, allSteps, stepStride } = store.state;
    const newSteps = [...allSteps];
    newSteps[currentStep] = value;
    if (stepStride === 2 && value !== SpecialStep.rest) {
      newSteps[currentStep + 1] = SpecialStep.tie;
    }
    store.setAllSteps(newSteps);
  },
  putRest() {
    actions.putStepValue(SpecialStep.rest);
    actions.shiftStep(1);
  },
  putTie() {
    actions.putStepValue(SpecialStep.tie);
    actions.shiftStep(1);
  },
  rotateStride() {
    store.setStepStride((prev) => (prev === 1 ? 2 : 1));
    const { stepStride, editPos: currentPos } = store.state;
    if (stepStride === 2 && currentPos % 2 === 1) {
      store.setEditPos((prev) => prev - 1);
    }
  },
  rotateBars() {
    store.setLoopBars((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
    const { loopBars, editPos: currentPos } = store.state;
    if (currentPos >= getLoopStepCount(loopBars)) {
      store.setEditPos(0);
    }
  },
  clearSteps() {
    store.setAllSteps(seqNumbers(256).map(() => SpecialStep.rest));
    store.setEditPos(0);
  },
  async inputNoteOn(noteNumber: number) {
    await actionsDi.resumeAudioContextFn?.();
    store.setActiveNotes((prev) => [...prev, noteNumber]);
    store.setPreviewNote(noteNumber);
    if (store.state.editing) {
      actions.putStepValue(noteNumber);
      actions.shiftStep(1);
    }
  },
  inputNoteOff(noteNumber: number) {
    store.setActiveNotes((prev) => prev.filter((p) => p !== noteNumber));
    store.setPreviewNote(-1);
  },
  setStepDuty(duty: number) {
    store.setStepDuty(duty);
  },
  setOctaveShift(octaveShift: number) {
    store.setOctaveShift(octaveShift);
  },
  setBpm(bpm: number) {
    store.setBpm(bpm);
  },
  async setStdPlaying(playing: boolean) {
    //standalone playback state
    await actionsDi.resumeAudioContextFn?.();
    store.setStdPlaying(playing);
  },
  setExPlaying(exPlaying: boolean) {
    //play state from host transport
    store.setExPlaying(exPlaying);
  },
  toggleEditing() {
    store.setEditing((prev) => !prev);
  },
  setEditPos(pos: number) {
    store.setEditPos(pos);
  },
};
