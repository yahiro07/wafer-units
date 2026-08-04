import { ComponentChildren } from "preact";
import { cz, qu } from "@/base/css-realm";
import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate, npx } from "@/utils/helpers";
import { SelectorOption } from "@/base/selector-option";
import { GeneralSelector } from "@/components/general-selector";

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
        sx={qu.wh(28, 28).rounded(14).relative().bd("#444")}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          sx={qu.full().flexVA()}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div sx={qu.wh(2, 10).bg("#fff")} />
        </div>
      </div>
    </KnobFrame>
  );
};

export const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      sx={qu.flexC().wh(20, 20)}
      style={{
        background: active ? "#59e" : "#ddd",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

export const PlainCellContent = ({
  text,
  width,
}: {
  text: string;
  width: number;
}) => {
  return <div sx={qu.flexC().w(width)}>{text}</div>;
};

export function reteToStepText(rate: number) {
  const steps = ["16", "8", "4", "2", "1", "/2", "/4", "/8", "/16"];
  const index = Math.min(Math.floor(rate * steps.length), steps.length - 1);
  return steps[index];
}

export const SteppedButton = ({
  active,
  rate,
  onClick,
}: {
  active: boolean;
  rate: number;
  onClick?: () => void;
}) => {
  return (
    <div sx={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
      {active ? reteToStepText(rate) : "--"}
    </div>
  );
};

export const LabeledBox = ({
  label,
  children,
  labelAlign = "center",
  width,
}: {
  label?: string;
  labelAlign?: "left" | "center" | "right";
  children: ComponentChildren;
  width?: number;
}) => {
  return (
    <div sx={qu.flexV()} style={width ? { width: npx(width) } : undefined}>
      <div
        sx={qu.fontSize(10).weight("bold").h(12)}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div sx={qu.flexC().h(40)}>{children}</div>
    </div>
  );
};

export const NarrowButton = ({
  text,
  children,
  active,
  onClick,
}: {
  text?: string;
  children?: ComponentChildren;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      sx={[
        qu.flexC().wh(40, 20).bg("#ddd").weight("bold").cursor("pointer"),
        active && qu.bg("#48c").color("#fff"),
      ]}
      onClick={onClick}
    >
      {text && <div sx={qu.fontSize(9)}>{text}</div>}
      {children}
    </div>
  );
};

export const ParameterSelector = <T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SelectorOption<T>[];
}) => {
  return (
    <GeneralSelector
      className={cz(qu.flexC().wh(100, 40).bg("#ddd").pl(1).fontSize(12))}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
