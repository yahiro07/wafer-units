import { ComponentChildren } from "preact";
import { KnobFrame } from "@/components/konb-frame";
import { linearInterpolate, npx } from "@/utils/helpers";
import { qlsx, qu } from "@/utils/qstyle-goober";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div
      class={qlsx(
        qu.bg("#87bec5").p(4).color("#333").rounded(2),
        qu.css({ border: `inset 1px #0004` }),
        className,
      )}
    >
      {children}
    </div>
  );
};

export const LabeledBox = ({
  className,
  label,
  children,
  labelAlign = "center",
  width,
}: {
  className?: string;
  label?: string;
  labelAlign?: "left" | "center" | "right";
  children?: ComponentChildren;
  width?: number;
}) => {
  return (
    <div
      class={qu.flexV().addClass(className)}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(11).weight("bold")}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40)}>{children}</div>
    </div>
  );
};

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

export const ButtonWithIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={qlsx(
        qu.wh(36, 36).bg("#999").bd("#555").rounded(8).p(0.75).cp(),
        qu.flexHA(),
      )}
      onClick={onClick}
    >
      <div
        class={qlsx(
          qu.wh(10, 10).rounded("full").bd("#444"),
          qu.bg(active ? "#0f0" : "#666"),
        )}
      />
    </div>
  );
};
