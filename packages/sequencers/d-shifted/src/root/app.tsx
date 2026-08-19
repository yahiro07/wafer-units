import { Button } from "@/components/button";
import { ButtonsSelector } from "@/components/buttons-selector";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
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

const patternLengthOptions = createPlainSelectorOptions([4, 8, 16]);

const PatternLengthContainer = () => {
  const { patternLength } = store.useSnapshot();
  return (
    <SideLabelBox label="STEPS">
      <ButtonsSelector
        options={patternLengthOptions}
        value={patternLength}
        onChange={store.setPatternLength}
        size="narrow"
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

const ShiftEnableButtonContainer = () => {
  const { shiftEnabled } = store.useSnapshot();
  return (
    <FeatureHeader
      label="SHIFT"
      active={shiftEnabled}
      onClick={store.toggleShiftEnabled}
    />
  );
};

const DeleteButtonContainer = () => {
  const handleClick = () => {
    store.setNotes([]);
  };
  return <IconButton icon={Icons.Trash} size={24} onClick={handleClick} />;
};

export const App = () => {
  // useSetupDrivers();
  return (
    <div class="flex-v gap-4 bg-clPageBg p-8 text-white">
      <div class="flex-ha gap-3 justify-between">
        <div>
          <h1 class="text-2xl font-bold">D-SHIFTED</h1>
        </div>
        <OctaveShiftContainer />
        <PatternLengthContainer />
        <StepDutyContainer />
      </div>
      <div class="flex-ha gap-2 justify-between">
        <ShiftEnableButtonContainer />
        <DeleteButtonContainer />
        <PatternLengthContainer />
        <StepDutyContainer />
      </div>
      <div class="flex-vc gap-2.5">
        <StepsIndicatorBar />
        <StepsEditorRoot />
      </div>
    </div>
  );
};
