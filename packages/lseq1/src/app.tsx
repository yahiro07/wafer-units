import { seqNumbers } from "mofur/ax";
import { ReactNode, useEffect } from "react";
import { Button, FeButtonBox } from "@/components/button";
import { ClockKnob } from "@/components/clock-knob";
import { Icons } from "@/components/icons";
import { FeNumberSliderBox } from "@/components/number-slider-box";
import { drivers } from "@/drivers";
import {
  KeyboardOctaveBlock,
  KeyboardTopKey,
} from "@/organisms/keyboard-block";
import { actions } from "@/store/actions";
import { store } from "@/store/store";
import { SpecialStep } from "@/types";

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
          active={state.stdPlaying}
          onClick={() => actions.setStdPlaying(!state.stdPlaying)}
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
  const { allSteps, editPos, playPos, stdPlaying, exPlaying } =
    store.useSnapshot();
  const steps = allSteps.slice(offset, offset + 4);
  const somePlaying = stdPlaying || exPlaying;
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
          noteOn={actions.inputNoteOn}
          noteOff={actions.inputNoteOff}
          keyWidth={keyWidth}
          keyHeight={keyHeight}
        />
      ))}
      <KeyboardTopKey
        noteNumber={84}
        activeNotes={activeNotes}
        noteOn={actions.inputNoteOn}
        noteOff={actions.inputNoteOff}
        keyWidth={keyWidth}
        keyHeight={keyHeight}
      />
    </div>
  );
};

const PageRoot = () => {
  return (
    <div className="flex-c h-full">
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

export function App() {
  useEffect(drivers.setupAll, []);
  return <PageRoot />;
}
