import { cz } from "@/common/css-realm";
import { ComponentChildren } from "preact";

export const LabeledBox = ({
  label,
  children,
  onLabelClick,
}: {
  label: string;
  children: ComponentChildren;
  onLabelClick?: () => void;
}) => {
  return (
    <div class="flex-vc gap-0.5">
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
