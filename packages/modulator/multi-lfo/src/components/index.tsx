import { ComponentChildren } from "preact";
import { LfoWave, XStep, YStep } from "@/defs/types";
import { KnobFrame } from "@/components/knob-frame";
import { linearInterpolate, npx } from "@/utils/helpers";
import { SelectorOption } from "@/utils/selector-option";
import { GeneralSelector } from "@/components/general-selector";
import { cz } from "@lib/mu2609/utils/cz";

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
        class="w-28px h-28px rounded-14px relative bd-#444"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          class="w-full h-full flex-va"
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class="w-2px h-10px bg-#fff" />
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
      class="flex-c w-20px h-20px cursor-pointer"
      style={{
        background: active ? "#59e" : "#ddd",
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
  return (
    <div class="flex-c" style={{ width: npx(width) }}>
      {text}
    </div>
  );
};

export const WaveButton = ({
  wave,
  onClick,
}: {
  wave: LfoWave;
  onClick: () => void;
}) => {
  const text = {
    [LfoWave.Sine]: "◯",
    [LfoWave.Triangle]: "△",
    [LfoWave.Saw]: "⊿",
    [LfoWave.Rect]: "□",
    [LfoWave.SampleHold]: "◉",
  }[wave];
  return (
    <div class="flex-c w-40px h-40px bg-#ddd" onClick={onClick}>
      {text}
    </div>
  );
};

export const XStepButton = ({
  xStep,
  onClick,
}: {
  xStep: XStep;
  onClick: () => void;
}) => {
  const text = {
    [XStep.None]: "--",
    [XStep.div16]: "/16",
    [XStep.div8]: "/8",
    [XStep.div4]: "/4",
  }[xStep];
  return (
    <div class="flex-c w-40px h-40px bg-#ddd" onClick={onClick}>
      {text}
    </div>
  );
};

export const YStepButton = ({
  yStep,
  onClick,
}: {
  yStep: YStep;
  onClick: () => void;
}) => {
  const text = {
    [YStep.None]: "--",
    [YStep.step3]: "3",
    [YStep.step4]: "4",
    [YStep.step8]: "8",
  }[yStep];
  return (
    <div class="flex-c w-40px h-40px bg-#ddd" onClick={onClick}>
      {text}
    </div>
  );
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
    <div class="flex-c w-40px h-40px bg-#ddd" onClick={onClick}>
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
    <div class="flex-v" style={width ? { width: npx(width) } : undefined}>
      <div class="text-10px font-bold h-15px" style={{ textAlign: labelAlign }}>
        {label}
      </div>
      <div class="flex-c h-40px">{children}</div>
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
        "flex-c w-40px h-20px bg-#ddd font-bold cursor-pointer",
        active && "bg-#48c text-#fff",
      )}
      onClick={onClick}
    >
      {text && <div class="text-9px">{text}</div>}
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
      className="flex-c w-100px h-40px bg-#ddd pl-1 text-12px"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
