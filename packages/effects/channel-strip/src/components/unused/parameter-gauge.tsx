import { cz, qu } from "@/common/css-realm";
import { KnobFrame } from "@/components/headless/knob-frame";

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
        class={cz(
          qu.wh(25, 100).flexV().fJustify("end").it,
          qu.bg(altColor ? "#555" : "#777").it,
        )}
      >
        <div
          class={qu.wh(25, 50).bg(altColor ? "#46a" : "#48c").it}
          style={{ height: `${value * 100}%` }}
        />
      </div>
    </KnobFrame>
  );
};
