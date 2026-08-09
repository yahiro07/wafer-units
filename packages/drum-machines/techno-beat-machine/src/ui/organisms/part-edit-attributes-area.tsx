import { useMemo } from "preact/hooks";
import { pitchTweakRangeMap } from "@/model/defs";
import { qu } from "@/ui/common/css-realm";
import { sampleVariationsMap, stepLengthOptions } from "@/ui/common/ui-data";
import { Button, ControlButton } from "@/ui/components/buttons";
import { LabeledKnob } from "@/ui/components/labeled-knob";
import { ShiftSelector } from "@/ui/components/shift-selector";
import { UpperLabel } from "@/ui/components/upper-label";
import { partActions } from "@/ui/store/actions";
import { useCurrentPart } from "@/ui/store/readers";
import { createPlainSelectorOptions } from "@/utils/selector-option";
import { Icons } from "@/ui/components/icons";

const SamplesSelectorContainer = () => {
  const part = useCurrentPart();
  const options = useMemo(() => {
    return createPlainSelectorOptions(sampleVariationsMap[part.partKey]);
  }, [part.partKey]);
  return (
    <UpperLabel label="SAMPLE">
      <ShiftSelector
        winWidth={80}
        options={options}
        value={part.sampleKey}
        onChange={partActions.setSample}
      />
    </UpperLabel>
  );
};

const SamplesShifterContainer = () => {
  return (
    <Button height={40} asr={1} onClick={() => partActions.shiftSample()}>
      <Icons.Exchange size={20} />
    </Button>
  );
};

const SamplesSelectorWrapper = () => {
  return (
    <div sx={qu.flexHA().gap(1)}>
      <SamplesSelectorContainer />
      <SamplesShifterContainer />
    </div>
  );
};

const StepLengthSelectorContainer = () => {
  const part = useCurrentPart();
  const stepLength = part.stepLength;
  return (
    <UpperLabel label="STEPS">
      <ShiftSelector
        options={stepLengthOptions}
        value={stepLength}
        onChange={partActions.setStepLength}
      />
    </UpperLabel>
  );
};

const PartKnobs = () => {
  const part = useCurrentPart();
  const [min, max, mode] = pitchTweakRangeMap[part.partKey];
  return (
    <div sx={qu.flexHA().gap(8)}>
      <LabeledKnob
        label="PITCH"
        value={part.pitchTweak}
        onChange={partActions.setPitchTweak}
        min={min}
        max={max}
        step={mode === "integer" ? 1 : 0.01}
      />
      <LabeledKnob
        label="WEAK"
        value={part.weakVelocity}
        onChange={partActions.setWeakVelocity}
      />
      <LabeledKnob
        label="VOL"
        value={part.volume}
        onChange={partActions.setVolume}
      />
    </div>
  );
};

const PartEditOperationButtons = () => {
  return (
    <div sx={qu.flexHA().gap(2)}>
      <ControlButton label="RND" onClick={partActions.randomizePart} />
      <ControlButton label="CLEAR" onClick={partActions.clearPartNotes} />
      <ControlButton label="ALTER" onClick={partActions.toggleWeakAll} />
    </div>
  );
};

export const PartEditAttributesArea = () => {
  return (
    <div sx={qu.flexHA().gap(8)}>
      <SamplesSelectorWrapper />
      <PartKnobs />
      <StepLengthSelectorContainer />
      <PartEditOperationButtons />
    </div>
  );
};
