import { ButtonsSelector } from "@/components/buttons-selector";
import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import { Knob } from "@/components/knob";
import { SideLabelBox } from "@/components/labeled-controls";
import { BaseStep } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { editActions } from "@/root/edit-actions";
import { PitchPreviewColumn } from "@/root/pitch-preview-column";
import { StepsEditorRoot } from "@/root/steps-editor";
import { store } from "@/root/store";
import {
  createPlainSelectorOptions,
  createSelectorOptions,
} from "@/utils/selector-option";

const octaveShiftOptions = createPlainSelectorOptions([-2, -1, 0, 1, 2]);

const OctaveShiftContainer = () => {
  const { octaveShift } = store.useSnapshot();
  return (
    <SideLabelBox label="OCTAVE">
      <ButtonsSelector
        options={octaveShiftOptions}
        value={octaveShift}
        onChange={store.setOctaveShift}
      />
    </SideLabelBox>
  );
};

const patternLengthOptions = createPlainSelectorOptions([16, 32, 64, 128]);

const PatternLengthContainer = () => {
  const { patternLength } = store.useSnapshot();
  return (
    <SideLabelBox label="STEPS">
      <ButtonsSelector
        options={patternLengthOptions}
        value={patternLength}
        onChange={editActions.setPatternLength}
      />
    </SideLabelBox>
  );
};

const baseStepOptions = createSelectorOptions<BaseStep>([
  ["16th", "/16"],
  ["8th", "/8"],
  ["4th", "/4"],
]);

const BaseStepContainer = () => {
  const { baseStep } = store.useSnapshot();
  return (
    <SideLabelBox label="BASE">
      <ButtonsSelector
        options={baseStepOptions}
        value={baseStep}
        onChange={store.setBaseStep}
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

const DoublerButtonContainer = () => {
  const { patternLength } = store.useSnapshot();
  const enabled = patternLength !== 64;
  return (
    <Button
      onClick={editActions.duplicateSteps2x}
      disabled={!enabled}
      className="bg-#0000!"
    >
      <div class="flex-vc gap-1 text-[11px]">
        <span>COPY</span>
        <span class="mt-[-6px]">2X</span>
      </div>
    </Button>
  );
};

const DeleteButtonContainer = () => {
  return (
    <IconButton icon={Icons.Trash} size={24} onClick={editActions.clearNotes} />
  );
};

const TopControlBars = () => {
  return (
    <>
      <div class="flex-ha gap-4 justify-between">
        <h1 class="text-2xl">VSC1</h1>
        <OctaveShiftContainer />
        <StepDutyContainer />
        <BaseStepContainer />
      </div>
      <div class="flex-h gap-4 justify-between">
        <ShiftEnableButtonContainer />
        <PatternLengthContainer />
        <DoublerButtonContainer />
        <DeleteButtonContainer />
      </div>
    </>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-3 bg-clPageBg p-8">
      <TopControlBars />
      <div class="flex-h gap-4">
        <PitchPreviewColumn />
        <StepsEditorRoot />
      </div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
