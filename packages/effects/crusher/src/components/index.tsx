import clsx from "clsx";
import { ComponentChildren } from "preact";
import { KnobFrame } from "@/components/konb-frame";
import { linearInterpolate } from "@/utils/helpers";

export const EffectorBody = ({
  children,
  className,
}: {
  children: ComponentChildren;
  className?: string;
}) => {
  return (
    <div
      class={clsx(
        "rounded-sm border border-slate-600 bg-[#acd] p-4 text-slate-800",
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
      class={clsx("flex-v", className)}
      style={width ? { width: `${width}px` } : undefined}
    >
      <div class="text-xs font-bold" style={{ textAlign: labelAlign }}>
        {label}
      </div>
      <div class="flex-c h-10">{children}</div>
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
        class="relative size-8 rounded-full border border-neutral-700 bg-neutral-500"
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        <div
          class="flex-va h-full w-full"
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div class="h-2.5 w-0.5 bg-white" />
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
      class={clsx(
        "flex-ha size-9 cursor-pointer rounded-lg border border-neutral-600 bg-neutral-400 p-1",
      )}
      onClick={onClick}
    >
      <div
        class={clsx(
          "size-2.5 rounded-full border border-neutral-700",
          active ? "bg-green-400" : "bg-neutral-500",
        )}
      />
    </div>
  );
};
