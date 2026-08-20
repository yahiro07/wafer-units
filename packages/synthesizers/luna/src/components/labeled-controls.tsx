import { Knob } from "@/components/knob";
import { ComponentChildren } from "preact";

export const LabeledBox = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class="flex-vc">
      <div>{children}</div>
      <div class="text-sm">{label}</div>
    </div>
  );
};

export const SideLabelBox = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class="flex-ha gap-2">
      <div class="text-sm">{label}</div>
      <div>{children}</div>
    </div>
  );
};

export const LabeledKnob = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <LabeledBox label={label}>
      <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
    </LabeledBox>
  );
};
