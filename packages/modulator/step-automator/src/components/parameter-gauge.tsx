import { qu } from "@/base/css-realm";
import { KnobFrame } from "@/components/knob-frame";

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
        sx={[
          qu.wh(25, 100).flexV().fJustify("end"),
          qu.bg(altColor ? "#555" : "#777"),
        ]}
      >
        <div
          sx={qu.wh(25, 50).bg(altColor ? "#46a" : "#48c")}
          style={{ height: `${value * 100}%` }}
        />
      </div>
    </KnobFrame>
  );
};
