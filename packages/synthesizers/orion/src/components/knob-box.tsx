import { Knob } from "@/components/knob";
import { tz } from "@/utils/tz";

export const KnobBox = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  onLabelClick,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  onLabelClick?: () => void;
}) => {
  return (
    <div class={styles.base}>
      <Knob value={value} onChange={onChange} min={min} max={max} step={step} />
      <div
        class={tz(styles.label, onLabelClick && "cursor-pointer")}
        onClick={onLabelClick}
      >
        {label}
      </div>
    </div>
  );
};
const styles = {
  base: tz("flex-vc gap-1"),
  label: tz(
    "text-sm font-[600] text-clSectionText w-[16px] flex-c whitespace-nowrap",
  ),
};
