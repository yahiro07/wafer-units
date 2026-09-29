import { Knob } from "@/components/knob";
import { cz } from "@lib/mu2609/utils/cz";
import { ComponentChildren } from "preact";

export const LabeledBox = ({
  className,
  label,
  children,
  onLabelClick,
}: {
  className?: string;
  label: string;
  children: ComponentChildren;
  onLabelClick?: () => void;
}) => {
  return (
    <div class={cz("flex-vc", className)}>
      <div>{children}</div>
      <div class="w-30px flex-c">
        <div
          class={cz(
            "text-sm font-500 whitespace-nowrap",
            onLabelClick && "cursor-pointer",
          )}
          onClick={onLabelClick}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export const LabeledKnob = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}) => {
  return (
    <LabeledBox label={label}>
      <Knob value={value} min={min} max={max} step={step} onChange={onChange} />
    </LabeledBox>
  );
};
