import { ButtonsSelector } from "@/components/buttons-selector";
import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import { Knob } from "@/components/knob";
import { SideLabelBox } from "@/components/labeled-controls";
import { BaseStep, EditScaleMode } from "@/defs/definitions";
import { useSetupDrivers } from "@/root/drivers";
import { editActions } from "@/root/edit-actions";
import { PitchPreviewColumn } from "@/root/pitch-preview-column";
import { StepsEditorRoot } from "@/root/steps-editor";
import { store } from "@/root/store";
import {
  createPlainSelectorOptions,
  createSelectorOptions,
} from "@/utils/selector-option";
import { ShiftSelector } from "@/components/shift-selector";
import { useMemo } from "preact/hooks";
import { actions } from "@/root/actions";
import { mapKeySpecToKeyName } from "@/utils/key-name-helper";

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

const useEditScaleModeOptions = () => {
  const { keySpec } = store.useSnapshot();
  return useMemo(() => {
    const keyName = mapKeySpecToKeyName(keySpec);
    return createSelectorOptions<EditScaleMode>([
      ["chromatic", "chromatic"],
      ["diatonic", `diatonic (${keyName})`],
    ]);
  }, [keySpec]);
};

const PitchModeContainer = () => {
  const { editScaleMode: pitchMode } = store.useSnapshot();
  const editScaleModeOptions = useEditScaleModeOptions();
  return (
    <SideLabelBox label="SCALE">
      <ShiftSelector
        width={140}
        options={editScaleModeOptions}
        value={pitchMode}
        onChange={store.setEditScaleMode}
      />
    </SideLabelBox>
  );
};

const DoublerButtonContainer = () => {
  const { patternLength } = store.useSnapshot();
  const enabled = patternLength !== 128;
  return (
    <Button
      onClick={editActions.duplicateSteps2x}
      disabled={!enabled}
      className="bg-#0000! text-black!"
    >
      <div class="flex-vc gap-1 text-[14px]">
        <span>COPY</span>
        <span class="mt-[-8px]">2X</span>
      </div>
    </Button>
  );
};

const DeleteButtonContainer = () => {
  return (
    <IconButton icon={Icons.Trash} size={24} onClick={editActions.clearNotes} />
  );
};

const PlayButtonContainer = () => {
  const { stdPlaying } = store.useSnapshot();
  return (
    <Button asr={1.8} active={stdPlaying} onClick={actions.toggleStdPlaying}>
      <Icons.Play />
    </Button>
  );
};

const TopControlBars = () => {
  return (
    <>
      <div class="flex-ha gap-12">
        <h1 class="text-2xl">VSC1</h1>
        <div class="grow" />
        <BaseStepContainer />
        <OctaveShiftContainer />
        <StepDutyContainer />
      </div>
      <div class="flex-ha">
        {/* <div class="w-128px" /> */}
        <div class="grow flex-ha justify-between">
          <PlayButtonContainer />
          <PitchModeContainer />
          <PatternLengthContainer />
          <DoublerButtonContainer />
          <DeleteButtonContainer />
        </div>
      </div>
    </>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-3 bg-clPageBg p-8">
      <TopControlBars />
      <div class="flex-ha gap-4">
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
