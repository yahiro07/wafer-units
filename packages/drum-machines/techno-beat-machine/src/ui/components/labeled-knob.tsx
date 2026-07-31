import { Knob } from "@/ui/components/knob";
import { UpperLabel } from "@/ui/components/upper-label";

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
    <UpperLabel label={label}>
      <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
    </UpperLabel>
  );
};
