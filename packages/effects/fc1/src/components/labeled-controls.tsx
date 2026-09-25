import { cz } from "@/utils/cz";
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
    <div class={cz("flex-vc gap-0.5", className)}>
      <div>{children}</div>
      <div class="w-30px flex-c">
        <div
          class={cz(
            "text-lg font-bold whitespace-nowrap",
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

export const TopLeftLabelBox = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class="flex-v gap-1">
      <div class="text-xl font-bold">{label}</div>
      <div>{children}</div>
    </div>
  );
};

// export const LabeledKnob = ({
//   label,
//   value,
//   onChange,
//   min,
//   max,
//   step,
// }: {
//   label: string;
//   value: number;
//   onChange: (value: number) => void;
//   min?: number;
//   max?: number;
//   step?: number;
// }) => {
//   return (
//     <LabeledBox label={label}>
//       <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
//     </LabeledBox>
//   );
// };

// export const LabeledSlider = ({
//   label,
//   value,
//   onChange,
//   min,
//   max,
//   step,
// }: {
//   label: string;
//   value: number;
//   onChange: (value: number) => void;
//   min?: number;
//   max?: number;
//   step?: number;
// }) => {
//   return (
//     <LabeledBox label={label}>
//       <Slider
//         value={value}
//         onChange={onChange}
//         min={min}
//         max={max}
//         step={step}
//       />
//     </LabeledBox>
//   );
// };
