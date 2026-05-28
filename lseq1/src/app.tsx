import { seqNumbers } from "beams/ax/array-utils";
import { mountAppRoot } from "beams/ax-react/mount-app-root";
import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { ReactNode, useEffect } from "react";
import { createSequencerTickDriver } from "sequencer-tick-driver";
import { createStore } from "snap-store";
import { Button, FeButtonBox } from "@/components/button";
import { ClockKnob } from "@/components/clock-knob";
import { Icons } from "@/components/icons";
import { FeNumberSliderBox } from "@/components/number-slider-box";
import {
  KeyboardOctaveBlock,
  KeyboardTopKey,
} from "@/organisms/keyboard-block";
import { createSequencerEngine } from "@/sequencer-engine";
import { createTargetSynthesizer, hostInterface } from "@/target-synthesizer";
import { LoopBars, SpecialStep, StepStride } from "@/types";

const targetSynth = createTargetSynthesizer();
const sequencerEngine = createSequencerEngine(targetSynth);
const standaloneTickDriver = createSequencerTickDriver();

type StoreState = {
  bpm: number;
  playing: boolean;
  activeNotes: number[];
  loopBars: LoopBars;
  stepStride: StepStride;
  allSteps: number[];
  octaveShift: number;
  stepDuty: number;
  editing: boolean;
  editPos: number;
  playPos: number;
  exPlaying: boolean;
};

const store = createStore<StoreState>({
  bpm: 120,
  playing: false,
  activeNotes: [],
  loopBars: 4,
  stepStride: 2,
  allSteps: seqNumbers(256).map(() => SpecialStep.rest),
  octaveShift: 0,
  stepDuty: 0.5,
  editing: false,
  editPos: 0,
  playPos: 0,
  exPlaying: false,
});
sequencerEngine.setAttributes({
  bpm: store.state.bpm,
  loopBars: store.state.loopBars,
  allSteps: store.state.allSteps,
  octaveShift: store.state.octaveShift,
  stepDuty: store.state.stepDuty,
});
standaloneTickDriver.setBpm(store.state.bpm);

function getLoopStepCount(loopBar: 1 | 2 | 4) {
  return loopBar * 16;
}

const actions = {
  setPlayPos(playPos: number) {
    store.setPlayPos(playPos);
  },
  wrapProcessStep(stepIndex: number) {
    sequencerEngine.processOnStep(stepIndex);
    const loopSteps = getLoopStepCount(store.state.loopBars);
    actions.setPlayPos(stepIndex % loopSteps);
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
    sequencerEngine.setStepValue(currentStep, value);
    if (stepStride === 2) {
      sequencerEngine.setStepValue(currentStep + 1, newSteps[currentStep + 1]);
    }
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
    sequencerEngine.setAttributes({ loopBars: store.state.loopBars });
  },
  clearSteps() {
    store.setAllSteps(seqNumbers(256).map(() => SpecialStep.rest));
    store.setEditPos(0);
    sequencerEngine.setAttributes({ allSteps: store.state.allSteps });
  },
  async noteOn(noteNumber: number) {
    await targetSynth.resumeIfNeed();
    store.setActiveNotes((prev) => [...prev, noteNumber]);
    sequencerEngine.previewNoteOn(noteNumber);
    if (store.state.editing) {
      actions.putStepValue(noteNumber);
      actions.shiftStep(1);
    }
  },
  noteOff(noteNumber: number) {
    store.setActiveNotes((prev) => prev.filter((p) => p !== noteNumber));
    sequencerEngine.previewNoteOff(noteNumber);
  },
  setStepDuty(duty: number) {
    store.setStepDuty(duty);
    sequencerEngine.setAttributes({ stepDuty: store.state.stepDuty });
  },
  setOctaveShift(octaveShift: number) {
    store.setOctaveShift(octaveShift);
    sequencerEngine.setAttributes({ octaveShift: store.state.octaveShift });
  },
  setBpm(bpm: number) {
    store.setBpm(bpm);
    sequencerEngine.setAttributes({ bpm });
    standaloneTickDriver.setBpm(bpm);
  },
  setPlaying(playing: boolean) {
    //standalone playback state
    store.setPlaying(playing);
    if (playing) {
      standaloneTickDriver.start({
        processStep: actions.wrapProcessStep,
      });
    } else {
      standaloneTickDriver.stop();
      sequencerEngine.allNotesOff();
    }
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

const LocationControlPart = () => {
  const { editPos: currentStep, loopBars } = store.useSnapshot();
  const barPos = (currentStep / 16) >>> 0;
  const stepInBar = currentStep % 16;
  const barTickAngle = (barPos / loopBars) * 360;
  const stepTickAngle = (stepInBar / 16) * 360;
  return (
    <div className="flex-ha gap-2">
      <ClockKnob tickAngle={barTickAngle} onTick={actions.shiftBar} />
      <div className="flex-c">
        <span className="w-[24px] flex-c">{barPos}</span>
        <span>-</span>
        <span className="w-[24px] flex-c">{stepInBar}</span>
      </div>
      <ClockKnob tickAngle={stepTickAngle} onTick={actions.shiftStep} />
    </div>
  );
};

const stepStrideToTextMap = {
  [1]: "/16",
  [2]: "/8",
} as const;

const TopBar = () => {
  const state = store.useSnapshot();
  return (
    <div className="flex-h gap-5 items-end relative">
      <div className="absolute top-0 w-full flex-c text-xs">LSEQ1</div>
      <div className="flex-h gap-2 items-end">
        <Button
          active={state.playing}
          onClick={() => actions.setPlaying(!state.playing)}
        >
          <Icons.Play />
        </Button>
        <FeNumberSliderBox
          label="BPM"
          value={state.bpm}
          min={60}
          max={180}
          onChange={actions.setBpm}
          fracDigits={0}
        />
      </div>
      <div className="grow flex-c">
        <LocationControlPart />
      </div>
      <div className="flex-h gap-2 items-end">
        <FeButtonBox
          label="BARS"
          text={state.loopBars.toString()}
          onClick={actions.rotateBars}
        />
        <FeButtonBox
          label="STEP"
          text={stepStrideToTextMap[state.stepStride]}
          onClick={actions.rotateStride}
        />
      </div>
    </div>
  );
};

function getStepCellText(step: number) {
  if (step === SpecialStep.rest) {
    return "";
  } else if (step === SpecialStep.tie) {
    return "-";
  } else {
    return "o";
  }
}

const BeatStepCells = ({ offset }: { offset: number }) => {
  const { allSteps, editPos, playPos, playing, exPlaying } =
    store.useSnapshot();
  const steps = allSteps.slice(offset, offset + 4);
  const somePlaying = playing || exPlaying;
  return (
    <div className="flex-h">
      {seqNumbers(4).map((i) => {
        const pos = offset + i;
        let borderSpec = "1px solid #888";
        if (pos === editPos) {
          borderSpec = "2px solid #08f";
        } else if (pos === playPos && somePlaying) {
          borderSpec = "2px solid #0c0";
        }
        return (
          <div
            key={i}
            className="w-[16px] h-[16px] flex-c text-[12px]"
            style={{ border: borderSpec }}
            onClick={() => actions.setEditPos(pos)}
          >
            {getStepCellText(steps[i])}
          </div>
        );
      })}
    </div>
  );
};

const BarCells = ({ barIndex }: { barIndex: number }) => {
  return (
    <div className="flex-h gap-1">
      <BeatStepCells offset={barIndex * 16 + 0} />
      <BeatStepCells offset={barIndex * 16 + 4} />
      <BeatStepCells offset={barIndex * 16 + 8} />
      <BeatStepCells offset={barIndex * 16 + 12} />
    </div>
  );
};

const StepsSection = () => {
  const { loopBars } = store.useSnapshot();
  return (
    <div className="border border-[#888] bg-[#fff] w-[300px] h-[115px] flex-vc gap-1.5">
      {seqNumbers(loopBars).map((_, index) => (
        <BarCells key={index} barIndex={index} />
      ))}
    </div>
  );
};

const SideButtonsPart = ({ children }: { children: ReactNode }) => {
  const { octaveShift, stepDuty, editing } = store.useSnapshot();
  const boxClasses = "w-[80px] flex-v gap-1";
  return (
    <div className="flex-ha">
      <div className={boxClasses}>
        <FeNumberSliderBox
          label="OCTAVE"
          value={octaveShift}
          min={-2}
          max={2}
          onChange={actions.setOctaveShift}
        />
        <FeNumberSliderBox
          label="DUTY"
          value={stepDuty}
          min={0.1}
          max={1}
          step={0.01}
          fracDigits={2}
          onChange={actions.setStepDuty}
        />
      </div>
      {children}
      <div className={boxClasses}>
        <div className="flex-vc gap-5">
          <Button text="CLEAR" onClick={actions.clearSteps} />
          <Button
            text="EDIT"
            active={editing}
            onClick={actions.toggleEditing}
          />
        </div>
      </div>
    </div>
  );
};

const BottomButtonsPart = () => {
  return (
    <div className="flex-ha gap-2">
      <Button text="<-" onClick={() => actions.shiftStep(-1)} />
      <Button text="->" onClick={() => actions.shiftStep(1)} />
      <div className="w-[28px]" />
      <Button text="REST" onClick={actions.putRest} />
      <Button text="TIE" onClick={actions.putTie} />
    </div>
  );
};

const KeyboardSection = () => {
  const { activeNotes } = store.useSnapshot();
  const keyWidth = 20;
  const keyHeight = 50;
  return (
    <div className="flex-h">
      {[48, 60, 72].map((baseNoteNumber) => (
        <KeyboardOctaveBlock
          key={baseNoteNumber}
          baseNoteNumber={baseNoteNumber}
          activeNotes={activeNotes}
          noteOn={actions.noteOn}
          noteOff={actions.noteOff}
          keyWidth={keyWidth}
          keyHeight={keyHeight}
        />
      ))}
      <KeyboardTopKey
        noteNumber={84}
        activeNotes={activeNotes}
        noteOn={actions.noteOn}
        noteOff={actions.noteOff}
        keyWidth={keyWidth}
        keyHeight={keyHeight}
      />
    </div>
  );
};

const PageRoot = () => {
  return (
    <div className="w-dvw h-dvh flex-c">
      <div className="flex-vc bg-gray-200 p-3 border border-gray-400">
        <div className="flex-vc gap-2">
          <TopBar />
          <SideButtonsPart>
            <StepsSection />
          </SideButtonsPart>
          <BottomButtonsPart />
          <KeyboardSection />
        </div>
      </div>
    </div>
  );
};

const drivers = {
  setupHostInterface() {
    if (hostInterface) {
      hostInterface.setupUnitAgent({
        type: "sequencer",
        categoryHint: "stepSequencer",
        setBpm(bpm) {
          actions.setBpm(bpm);
        },
        setPlayState(playing) {
          actions.setExPlaying(playing);
          if (!playing) {
            sequencerEngine.allNotesOff();
          }
        },
        transportHandling: { processStep: actions.wrapProcessStep },
      });
    }
  },
  setupMidiKeyboardInput() {
    if (!hostInterface) {
      return setupMidiKeyboardInput({
        noteOn: actions.noteOn,
        noteOff: actions.noteOff,
      });
    }
  },
  setupAll() {
    drivers.setupHostInterface();
    const closeMidiIn = drivers.setupMidiKeyboardInput();
    return () => {
      closeMidiIn?.();
    };
  },
};

const App = () => {
  useEffect(drivers.setupAll, []);
  return <PageRoot />;
};

mountAppRoot(<App />);
