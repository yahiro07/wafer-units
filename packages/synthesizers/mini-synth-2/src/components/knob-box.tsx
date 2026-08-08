import { Knob } from "@/components/knob";
import { css } from "@twind/core";

export const KnobBox = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <div class={styles.base}>
      <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
      <div class="label">{label}</div>
    </div>
  );
};
const styles = {
  base: css({
    "@apply": "flex-vc",
    "> .label": {
      "@apply": "text-sm text-gray-500 weight-[600]",
    },
  }),
};
