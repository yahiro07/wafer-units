import { qu } from "@/common/css-realm";
import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate } from "@/utils/helpers";

export const Knob = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  onClick,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      onClick={onClick}
      dragDisabled={disabled}
    >
      <div
        class={
          qu.wh(28, 28).rounded("100%").relative().bg("#aaa").bd("#666").it
        }
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          class={qu.full().flexVA().it}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class={qu.wh(2, 10).bg("#fff").it} />
        </div>
      </div>
    </KnobFrame>
  );
};
