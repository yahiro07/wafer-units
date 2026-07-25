import { cz, qu } from "@/common/css-realm";
import { PatterRangeOptions, stepReferenceIndexMap } from "@/common/defs";
import { getStep, setStep } from "@/common/step-bits-helper";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { LedIndicator } from "@/components/led-indicator";
import { OptionMappedKnob } from "@/components/unused/option-mapped-knob";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

const TitleLabel = ({ title }: { title: string }) => {
  return <div class={qu.fontSize(18).weight("bold").it}>{title}</div>;
};

const MatrixPart = () => {
  const { stepBits, playPos, patternRange } = store.useSnapshot();

  const toggleStep = (xi: number) => {
    const currentStep = getStep(stepBits, xi);
    const isPrevNote = xi > 0 && getStep(stepBits, xi - 1) > 0;
    const newStep = isPrevNote ? (currentStep + 1) % 3 : (currentStep + 1) % 2;
    let newStepBits = setStep(stepBits, xi, newStep);
    if (xi < 15 && newStep === 0) {
      const nextStep = getStep(stepBits, xi + 1);
      if (nextStep === 2) {
        newStepBits = setStep(newStepBits, xi + 1, 1);
      }
    }
    store.setStepBits(newStepBits);
  };

  return (
    <div class={qu.flexH().gap(1).it}>
      {seqNumbers(16).map((xIndex) => {
        const si = stepReferenceIndexMap[patternRange][xIndex];
        const stepValue = getStep(stepBits, si);
        const isStepActive = stepValue > 0;
        const isTie = stepValue === 2;
        const isAltColor = xIndex % 8 >= 4;
        let color = "#888";
        if (isStepActive) {
          color = "#cf0";
        } else if (isAltColor) {
          color = "#666";
        }
        return (
          <div class={qu.flexVC().gap(1.5).it}>
            <LedIndicator active={playPos === xIndex} />
            <div
              class={qu.wh(24, 30).cursor("pointer").relative().it}
              style={{ background: color }}
              onPointerDown={() => toggleStep(si)}
            >
              {isTie && (
                <div
                  class={cz(
                    qu.absolute().top(0).left(-6).wh(6, 30).it,
                    qu.bg("#cf0").it,
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ControlsPart = () => {
  const { octave, duty, patternRange } = store.useSnapshot();
  return (
    <div class={qu.full().flexHA().gap(2).fJustify("between").it}>
      <TitleLabel title="bseq2" />
      <div class={qu.flexHA().gap(6).it}>
        <LabeledBox label="Octave">
          <Knob
            value={octave}
            onChange={store.setOctave}
            min={-2}
            max={2}
            step={1}
          />
        </LabeledBox>
        <LabeledBox label="Duty">
          <Knob value={duty} onChange={store.setDuty} />
        </LabeledBox>
        <LabeledBox label={`PT ${patternRange}`} width={40}>
          <OptionMappedKnob
            options={PatterRangeOptions}
            value={patternRange}
            onChange={store.setPatternRange}
          />
        </LabeledBox>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class={cz(qu.wh("dvw", "dvh").flexC().it)}>
      <div class={qu.flexC().it}>
        <EffectorBody className={cz(qu.wh(480, 200).it, qu.flexVC().it)}>
          <div class={qu.flexV().gap(5).it}>
            <ControlsPart />
            <MatrixPart />
          </div>
        </EffectorBody>
      </div>
    </div>
  );
};
