import { Button } from "@/components/button";
import { ButtonsSelector } from "@/components/buttons-selector";
import { IconButton } from "@/components/icon-button";
import { Icons } from "@/components/icons";
import { Knob } from "@/components/knob";
import { SideLabelBox } from "@/components/side-label-box";
import { StepsEditorRoot } from "@/root/steps-editor";
import { StepsIndicatorBar } from "@/root/steps-indicator-bar";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { useMemo } from "preact/hooks";

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

const patternLengthOptions = createPlainSelectorOptions([4, 8, 16, 32, 64]);

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

type PageButtonItem = {
  label: string;
  value: number;
  active: boolean;
  enabled: boolean;
};

function usePageButtonItems(): PageButtonItem[] {
  const { patternLength, currentPageIndex } = store.useSnapshot();
  return useMemo(() => {
    return seqNumbers(4).map((i) => {
      return {
        label: (i + 1).toString(),
        value: i,
        active: i === currentPageIndex,
        enabled: patternLength === 64 || (patternLength === 32 && i < 2),
      };
    });
  }, [patternLength, currentPageIndex]);
}

const PageButtonsContainer = () => {
  const pageButtonItems = usePageButtonItems();
  return (
    <SideLabelBox label="PAGE">
      <div class="flex-ha gap-1">
        {pageButtonItems.map((item) => (
          <Button
            key={item.value}
            height={36}
            asr={1}
            active={item.active}
            disabled={!item.enabled}
            onClick={() => store.setCurrentPageIndex(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
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
  const handleClick = () => {};
  const { patternLength } = store.useSnapshot();
  const enabled = patternLength !== 64;
  return (
    <Button onClick={handleClick} disabled={!enabled} className="bg-#0000!">
      <div class="flex-vc gap-1 text-[11px]">
        <span>COPY</span>
        <span class="mt-[-6px]">2X</span>
      </div>
    </Button>
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
        <PatternLengthContainer />
        <PageButtonsContainer />
        <DoublerButtonContainer />
        <DeleteButtonContainer />
        <StepDutyContainer />
      </div>
      <div class="flex-vc gap-2.5">
        <StepsIndicatorBar />
        <StepsEditorRoot />
      </div>
    </div>
  );
};
