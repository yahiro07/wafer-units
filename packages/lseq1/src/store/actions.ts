import { seqNumbers } from "beams/ax/array-utils";
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
  // wrapProcessStep(stepIndex: number) {
  //   sequencerEngine.processOnStep(stepIndex);
  //   const loopSteps = getLoopStepCount(store.state.loopBars);
  //   actions.setPlayPos(stepIndex % loopSteps);
  // },
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
    // sequencerEngine.setStepValue(currentStep, value);
    // if (stepStride === 2) {
    //   sequencerEngine.setStepValue(currentStep + 1, newSteps[currentStep + 1]);
    // }
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
    // sequencerEngine.setAttributes({ loopBars: store.state.loopBars });
  },
  clearSteps() {
    store.setAllSteps(seqNumbers(256).map(() => SpecialStep.rest));
    store.setEditPos(0);
    // sequencerEngine.setAttributes({ allSteps: store.state.allSteps });
  },
  async inputNoteOn(noteNumber: number) {
    // await targetSynth.resumeIfNeed();
    await actionsDi.resumeAudioContextFn?.();
    store.setActiveNotes((prev) => [...prev, noteNumber]);
    // sequencerEngine.previewNoteOn(noteNumber);
    store.setPreviewNote(noteNumber);
    if (store.state.editing) {
      actions.putStepValue(noteNumber);
      actions.shiftStep(1);
    }
  },
  inputNoteOff(noteNumber: number) {
    store.setActiveNotes((prev) => prev.filter((p) => p !== noteNumber));
    store.setPreviewNote(-1);
    // sequencerEngine.previewNoteOff(noteNumber);
  },
  setStepDuty(duty: number) {
    store.setStepDuty(duty);
    // sequencerEngine.setAttributes({ stepDuty: store.state.stepDuty });
  },
  setOctaveShift(octaveShift: number) {
    store.setOctaveShift(octaveShift);
    // sequencerEngine.setAttributes({ octaveShift: store.state.octaveShift });
  },
  setBpm(bpm: number) {
    store.setBpm(bpm);
    // sequencerEngine.setAttributes({ bpm });
    // standaloneTickDriver.setBpm(bpm);
  },
  async setStdPlaying(playing: boolean) {
    actionsDi.resumeAudioContextFn?.();
    //standalone playback state
    store.setStdPlaying(playing);
    // if (playing) {
    //   standaloneTickDriver.start({
    //     processStep: actions.wrapProcessStep,
    //   });
    // } else {
    //   standaloneTickDriver.stop();
    //   sequencerEngine.allNotesOff();
    // }
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
