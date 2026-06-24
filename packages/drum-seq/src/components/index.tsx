import clsx from "clsx";
import { linearInterpolate } from "mofur/ax";
import { KnobFrame } from "mofur/mo-react";
import { ReactNode } from "react";
import { camelToKebab } from "@/common/casing-helper";
import { colorMod } from "@/common/color-mod";

const colors = {
  clPanelBg: colorMod("#445060", "v-3 s-5"),
  clHeadPartBg: colorMod("#444850", "s-3 v-6"),
  clBodyPartBg: colorMod("#444850", "s-10 v-10"),
  clKnobBg: colorMod("#445", "h-20 s-8 v+5"),
  clStepButtonBg: colorMod("#565", "v23 s4"),
  clStepButtonBgAlt: colorMod("#655", "v23 s4"),
  clPieceIndicatorBg: colorMod("#666", "v-12"),
  clPieceOperationButtonBg: colorMod("#445", "h-20 s-8 v+5"),
  clPieceActiveButtonBg: colorMod("#445", "h-20 s-8 v+5"),
  clKnobTickBg: colorMod("#fff"),
  clIndicatorActive: colorMod("#8e6", "a90"),
  clIndicatorActiveAlt: colorMod("#fff", "a70"),
  clStepIndicator: colorMod("#333", "a60"),
};

const cssVariablesCss = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [
    `--${camelToKebab(key)}`,
    value,
  ]),
);

export const CssVariablesFrame = ({ children }: { children: ReactNode }) => {
  return <div style={cssVariablesCss}>{children}</div>;
};

const uiClasses = {
  borderCommon: "border border-black/40",
  roundedFew: "rounded-[2px]",
  bgPanel: "bg-(--cl-panel-bg)",
  bgHeadPart: "bg-(--cl-head-part-bg)",
  bgBodyPart: "bg-(--cl-body-part-bg)",
  bgKnob: "bg-(--cl-knob-bg)",
  bgStepButton: "bg-(--cl-step-button-bg)",
  bgStepButtonAlt: "bg-(--cl-step-button-bg-alt)",
  bgPieceIndicator: "bg-(--cl-piece-indicator-bg)",
  bgPieceOperationButton: "bg-(--cl-piece-operation-button-bg)",
  bgPieceActiveButton: "bg-(--cl-piece-active-button-bg)",
  bgKnobTick: "bg-(--cl-knob-tick-bg)",
  bgIndicatorActive: "bg-(--cl-indicator-active)",
  bgIndicatorActiveAlt: "bg-(--cl-indicator-active-alt)",
  bgStepIndicator: "bg-(--cl-step-indicator)",
};

//----------

export const PieceActiveButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx("w-8 h-8", "flex-c", "cursor-pointer")}
      onClick={onClick}
    >
      <div
        className={clsx(
          "w-6 h-6",
          uiClasses.borderCommon,
          active
            ? uiClasses.bgIndicatorActiveAlt
            : uiClasses.bgPieceActiveButton,
          uiClasses.roundedFew,
        )}
      />
    </button>
  );
};

export const Knob = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const min = 0;
  const max = 1;
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <KnobFrame value={0.5} min={0} max={1} step={0.01} onChange={onChange}>
      <div
        className={clsx(
          "w-8 h-8",
          "rounded-full",
          "relative",
          uiClasses.bgKnob,
          uiClasses.borderCommon,
        )}
      >
        <div
          className="w-full h-full flex justify-center"
          style={{
            transform: `rotate(${tickAngle}deg)`,
          }}
        >
          <div className={clsx("w-[2px] h-[10px]", uiClasses.bgKnobTick)} />
        </div>
      </div>
    </KnobFrame>
  );
};

export const PieceNameBox = ({ pieceName }: { pieceName: string }) => {
  return (
    <div
      className={clsx(
        "w-[75px] h-8",
        "flex-ha",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        "text-white font-bold text-sm",
      )}
    >
      {pieceName}
    </div>
  );
};

export const PieceAssignIndexLabel = ({ label }: { label: string }) => {
  return (
    <div
      className={clsx(
        "absolute right-0 top-0 mr-[2px]",
        "text-white text-[8px]",
      )}
    >
      {label}
    </div>
  );
};

export const PieceOperationButton = ({
  children,
  coverContent,
  onClick,
}: {
  children: ReactNode;
  coverContent?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "w-8 h-8 flex-c text-white text-md",
        "cursor-pointer",
        "relative",
        uiClasses.bgPieceOperationButton,
        uiClasses.borderCommon,
        uiClasses.roundedFew,
      )}
      onClick={onClick}
    >
      {children}
      {coverContent}
    </button>
  );
};

export const PieceIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      className={clsx(
        "w-2.5 h-7",
        uiClasses.borderCommon,
        active ? uiClasses.bgIndicatorActive : uiClasses.bgPieceIndicator,
        uiClasses.roundedFew,
      )}
    />
  );
};

export const StepButton = ({
  active,
  lightOn,
  altColor,
  onClick,
}: {
  active: boolean;
  lightOn: boolean;
  altColor: boolean;
  onClick: () => void;
}) => {
  const lightOpacity = active ? 0.4 : 0;
  return (
    <div
      className={clsx(
        "w-5.5 h-8 relative flex-va cursor-pointer",
        "overflow-hidden",
        uiClasses.roundedFew,
        altColor ? uiClasses.bgStepButtonAlt : uiClasses.bgStepButton,
        uiClasses.borderCommon,
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "w-[11px] h-[3.5px] mt-[4px]",
          lightOn ? uiClasses.bgIndicatorActive : uiClasses.bgStepIndicator,
          "border-[0.5px] border-black/20",
          "rounded-[1px]",
        )}
      />
      <div
        className={clsx("absolute-full", "bg-white/50")}
        style={{ opacity: lightOpacity }}
      />
    </div>
  );
};

export const PieceRowFrame = ({
  headPart,
  bodyPart,
}: {
  headPart: ReactNode;
  bodyPart: ReactNode;
}) => {
  return (
    <div className={clsx("flex-h")}>
      <div className={clsx("p-2.5", uiClasses.bgHeadPart)}>{headPart}</div>
      <div className={clsx("p-2.5", uiClasses.bgBodyPart)}>{bodyPart}</div>
    </div>
  );
};

export const PanelFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div className={clsx("flex-c", "w-[840px] h-[360px]", uiClasses.bgPanel)}>
      {children}
    </div>
  );
};
