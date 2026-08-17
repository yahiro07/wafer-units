import { Button } from "@/components/button";
import { ButtonsSelector } from "@/components/buttons-selector";
import { Knob } from "@/components/knob";
import { SideLabelBox } from "@/components/side-label-box";
import { StepsEditorRoot } from "@/root/steps-editor";
import { StepsIndicatorBar } from "@/root/steps-indicator-bar";
import { store } from "@/root/store";
import { createPlainSelectorOptions } from "@/utils/selector-option";

const octaveShiftOptions = createPlainSelectorOptions([-2, -1, 0, 1, 2]);

const OctaveShiftContainer = () => {
  const { octaveShift } = store.useSnapshot();
  return (
    <SideLabelBox label="OCTAVE">
      <ButtonsSelector
        options={octaveShiftOptions}
        value={octaveShift}
        onChange={store.setOctaveShift}
        size="narrow"
      />
    </SideLabelBox>
  );
};

const patternLengthOptions = createPlainSelectorOptions([4, 8, 16, 32]);

const PatternLengthContainer = () => {
  const { patternLength } = store.useSnapshot();
  return (
    <SideLabelBox label="STEPS">
      <ButtonsSelector
        options={patternLengthOptions}
        value={patternLength}
        onChange={store.setPatternLength}
        size="wide"
      />
    </SideLabelBox>
  );
};

const StepDutyContainer = () => {
  const { stepDuty } = store.useSnapshot();
  return (
    <SideLabelBox label="DUTY">
      <Knob value={stepDuty} onChange={store.setStepDuty} />
    </SideLabelBox>
  );
};

const FeatureHeader = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div class="flex-ha gap-2">
      <Button height={28} asr={1} active={active} onClick={onClick} />
      <div>{label}</div>
    </div>
  );
};

const ChordHeaderContainer = () => {
  const { chordEnabled } = store.useSnapshot();
  return (
    <FeatureHeader
      label="CHORD"
      active={chordEnabled}
      onClick={() => store.setChordEnabled(!chordEnabled)}
    />
  );
};

const GaterHeaderContainer = () => {
  const { gaterEnabled } = store.useSnapshot();
  return (
    <FeatureHeader
      label="GATER"
      active={gaterEnabled}
      onClick={() => store.setGaterEnabled(!gaterEnabled)}
    />
  );
};

const chordToneLabels = ["R0", "3", "5", "7", "R1", "3", "5", "7", "R2"];

const ChordButtonsContainer = () => {
  const { chordToneFlags } = store.useSnapshot();
  const toggle = (index: number) => {
    store.setChordToneFlags((prev) =>
      prev.map((flag, i) => (i === index ? !flag : flag)),
    );
  };
  return (
    <div class="flex-h gap-1.25">
      {chordToneLabels.map((label, index) => (
        <Button active={chordToneFlags[index]} onClick={() => toggle(index)}>
          {label}
        </Button>
      ))}
    </div>
  );
};

export const App = () => {
  return (
    <div class="flex-v gap-4 bg-clPageBg p-8 text-white">
      <div class="flex-ha gap-2 justify-between">
        <div>
          <h1 class="text-2xl font-bold">CHORDGATER</h1>
        </div>
        <OctaveShiftContainer />
      </div>
      <div class="flex-ha gap-2 justify-between">
        <ChordHeaderContainer />
        <ChordButtonsContainer />
      </div>
      <div class="flex-ha gap-2 justify-between">
        <GaterHeaderContainer />
        <PatternLengthContainer />
        <StepDutyContainer />
      </div>
      <div class="h-140px flex-vc gap-2">
        <StepsIndicatorBar />
        <StepsEditorRoot />
      </div>
    </div>
  );
};
