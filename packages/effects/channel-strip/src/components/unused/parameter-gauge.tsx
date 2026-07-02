import { KnobFrame } from "@/components/headless/knob-frame";
import { cx, qu } from "@/utils/qstyle-goober";

export const ParameterGauge = ({
  value,
  onChange,
  altColor = false,
}: {
  value: number;
  onChange: (value: number) => void;
  altColor?: boolean;
}) => {
  return (
    <KnobFrame value={value} min={0} max={1} step={0.01} onChange={onChange}>
      <div
        class={cx(
          qu.wh(25, 100).flexV().justify("end"),
          qu.bg(altColor ? "#555" : "#777"),
        )}
      >
        <div
          class={qu.wh(25, 50).bg(altColor ? "#46a" : "#48c")}
          style={{ height: `${value * 100}%` }}
        />
      </div>
    </KnobFrame>
  );
};
