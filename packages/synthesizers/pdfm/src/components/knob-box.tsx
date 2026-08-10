import { tz } from "@/common/setup-twind";
import { Knob } from "@/components/knob";

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
      <div class={styles.label}>{label}</div>
    </div>
  );
};
const styles = {
  base: tz("flex-vc gap-1"),
  label: tz("text-sm font-[600]"),
};
