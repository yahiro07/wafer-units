import clsx from "clsx";
import { linearInterpolate } from "mofur/ax";
import { npx } from "mofur/ax-ui";
import { KnobFrame } from "mofur/mo-react";
import { ReactNode } from "react";
import { ShifterFrame } from "@/components/control-frames";
import { Icons } from "@/components/icons";
import { SelectorOption } from "@/components/selector-option";
import { colorVars, uiClasses } from "@/components/ui-theme";

export const Knob = ({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    >
      <div
        className={clsx(
          "w-7 h-7 rounded-full relative",
          uiClasses.borderCommon,
        )}
        style={{ background: colorVars.clKnobBg }}
      >
        <div
          className="w-full h-full flex justify-center"
          style={{ transform: `rotate(${tickAngle}deg)` }}
        >
          <div
            className={clsx("w-[2px] h-[10px]")}
            style={{ background: colorVars.clKnobTickBg }}
          />
        </div>
      </div>
    </KnobFrame>
  );
};

export const PieceNameBox = ({
  pieceName,
  onClick,
}: {
  pieceName: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "w-[75px] h-8 flex-ha",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        "text-white font-bold text-sm",
      )}
      onClick={onClick}
    >
      {pieceName}
    </button>
  );
};

export const TitleLabel = ({ title }: { title: string }) => {
  return <div className="text-xl font-bold">{title}</div>;
};

export const PanelFrame = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx("flex-c", className)}
      style={{ background: colorVars.clPanelBg }}
    >
      {children}
    </div>
  );
};

export const UpperLabel = ({
  label,
  children,
  yOffset = 0,
}: {
  label: string;
  children: ReactNode;
  yOffset?: number;
}) => {
  return (
    <div className="relative">
      {children}
      <div
        className={clsx(
          "absolute left-0 flex-c text-[11px] font-bold",
          "whitespace-nowrap",
        )}
        style={{ top: npx(yOffset - 16) }}
      >
        {label}
      </div>
    </div>
  );
};

export const Button = ({
  className,
  active,
  disabled,
  text,
  children,
  onClick,
}: {
  className?: string;
  active?: boolean;
  disabled?: boolean;
  text?: string;
  children?: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className={clsx(
        "flex-c justify-between",
        "w-15 h-7",
        uiClasses.borderCommon,
        "text-white text-[14px] font-medium",
        "cursor-pointer",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: active
          ? colorVars.clButtonActiveBg
          : colorVars.clKnobBg,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {text && <span>{text}</span>}
      {children}
    </button>
  );
};

export const ShiftSelector = <T extends string | number>({
  className,
  options,
  value,
  onChange,
}: {
  className?: string;
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) => {
  const currentIndex = options.findIndex((option) => option.value === value);
  const currentOption = options[currentIndex];
  const canShiftLeft = currentIndex > 0;
  const canShiftRight = currentIndex < options.length - 1;

  const handleShift = (dir: -1 | 1) => {
    const newIndex = currentIndex + dir;
    if (newIndex < 0) return;
    if (newIndex >= options.length) return;
    onChange(options[newIndex].value);
  };
  return (
    <ShifterFrame onShift={handleShift}>
      <div
        className={clsx(
          className,
          "flex-ha justify-between",
          "min-w-13 h-7",
          uiClasses.borderCommon,
          "text-white text-[14px] font-medium",
          "cursor-pointer",
        )}
        style={{ background: colorVars.clKnobBg }}
      >
        <Icons.ArrowLeft
          size={20}
          className={clsx("ml-[-6px]", !canShiftLeft && "invisible")}
        />
        <div>{currentOption?.label}</div>
        <Icons.ArrowRight
          size={20}
          className={clsx("mr-[-6px]", !canShiftRight && "invisible")}
        />
      </div>
    </ShifterFrame>
  );
};
