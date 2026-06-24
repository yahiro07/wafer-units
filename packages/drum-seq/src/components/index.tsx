import { css } from "@emotion/react";
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
};

export const CssVariablesFrame = ({ children }: { children: ReactNode }) => {
  return <div css={cssVariablesCss}>{children}</div>;
};

const cssVariablesCss = css(
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [
      `--${camelToKebab(key)}`,
      value,
    ]),
  ),
);

const uiClasses = {
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
  borderCommon: "border border-black/40",
};

//----------

export const PieceActiveButton = ({ active }: { active: boolean }) => {
  return (
    <div className={clsx("w-8 h-8", "flex-c")}>
      <div
        className={clsx(
          "w-6 h-6",
          uiClasses.bgPieceActiveButton,
          uiClasses.borderCommon,
        )}
      />
    </div>
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
        "w-[80px] h-8",
        "flex-ha",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        "text-white font-bold text-sm",
      )}
    >
      {pieceName}
    </div>
  );
};

export const PieceOperationButton = () => {
  return <div className={clsx("w-8 h-8", uiClasses.bgPieceOperationButton)} />;
};

export const StepButton = ({
  active,
  lightOn,
  altColor,
}: {
  active: boolean;
  lightOn: boolean;
  altColor: boolean;
}) => {
  let lightOpacity = 0;
  if (active && lightOn) {
    lightOpacity = 1;
  } else if (active) {
    lightOpacity = 0.4;
  } else if (lightOn) {
    lightOpacity = 0.1;
  }

  return (
    <div
      className={clsx(
        "w-5.5 h-8 relative",
        "rounded-[2px] overflow-hidden",
        altColor ? uiClasses.bgStepButtonAlt : uiClasses.bgStepButton,
        uiClasses.borderCommon,
      )}
    >
      <div
        className={clsx("w-full h-full", "bg-white/50")}
        style={{ opacity: lightOpacity }}
      />
    </div>
  );
};

export const PieceIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      className={clsx(
        "w-2.5 h-8",
        uiClasses.bgPieceIndicator,
        uiClasses.borderCommon,
      )}
    />
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
