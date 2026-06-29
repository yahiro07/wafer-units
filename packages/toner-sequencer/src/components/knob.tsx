import { linearInterpolate } from "mofur/ax";
import { KnobFrame } from "@/components/knob-frame";
import { qu } from "@/utils/qstyle-goober";

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
        class={qu.wh(34, 34).rounded("100%").relative().bg("#777").bd("#444")}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          class={qu.full().flexVA()}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class={qu.wh(2, 10).bg("#fff")} />
        </div>
      </div>
    </KnobFrame>
  );
};
