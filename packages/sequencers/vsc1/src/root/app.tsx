import { ButtonsSelector } from "@/components/buttons-selector";
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

const TopControlBar = () => {
  return (
    <div class="flex-ha gap-4 justify-between">
      <h1 class="text-2xl">VSC1</h1>
      <OctaveShiftContainer />
      <PatternLengthContainer />
      <BaseStepContainer />
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v gap-3">
      <TopControlBar />
      <div class="flex-h gap-4">
        <PitchPreviewColumn />
        <StepsEditorRoot />
        {/* <StepsEditor2 /> */}
      </div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
