import { ComponentChildren } from "preact";
import { cz, qu } from "@/base/css-realm";
import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate, npx } from "@/utils/helpers";

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
        class={qu.wh(28, 28).rounded(14).relative().bd("#444").it}
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

export const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={qu.flexC().wh(20, 20).it}
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
  return <div class={qu.flexC().w(width).it}>{text}</div>;
};

// export const WaveButton = ({
//   wave,
//   onClick,
// }: {
//   wave: LfoWave;
//   onClick: () => void;
// }) => {
//   const text = {
//     [LfoWave.Sine]: "◯",
//     [LfoWave.Triangle]: "△",
//     [LfoWave.Saw]: "⊿",
//     [LfoWave.Rect]: "□",
//     [LfoWave.SampleHold]: "◉",
//   }[wave];
//   return (
//     <div class={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
//       {text}
//     </div>
//   );
// };

// export const XStepButton = ({
//   xStep,
//   onClick,
// }: {
//   xStep: XStep;
//   onClick: () => void;
// }) => {
//   const text = {
//     [XStep.None]: "--",
//     [XStep.div16]: "/16",
//     [XStep.div8]: "/8",
//     [XStep.div4]: "/4",
//   }[xStep];
//   return (
//     <div class={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
//       {text}
//     </div>
//   );
// };

// export const YStepButton = ({
//   yStep,
//   onClick,
// }: {
//   yStep: YStep;
//   onClick: () => void;
// }) => {
//   const text = {
//     [YStep.None]: "--",
//     [YStep.step3]: "3",
//     [YStep.step4]: "4",
//     [YStep.step8]: "8",
//   }[yStep];
//   return (
//     <div class={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
//       {text}
//     </div>
//   );
// };

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
    <div class={qu.flexC().wh(40, 40).bg("#ddd").it} onClick={onClick}>
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
    <div
      class={qu.flexV().it}
      style={width ? { width: npx(width) } : undefined}
    >
      <div
        class={qu.fontSize(10).weight("bold").h(12).it}
        style={{ textAlign: labelAlign }}
      >
        {label}
      </div>
      <div class={qu.flexC().h(40).it}>{children}</div>
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
      class={cz(
        qu.flexC().wh(40, 20).bg("#ddd").weight("bold").cp().it,
        active && qu.bg("#48c").color("#fff").it,
      )}
      onClick={onClick}
    >
      {text && <div class={qu.fontSize(9).it}>{text}</div>}
      {children}
    </div>
  );
};
