import { css } from "@emotion/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { colorMod } from "@/common/cl-mod";

export const CssVariablesFrame = ({ children }: { children: ReactNode }) => {
  return <div css={cssVariablesCss}>{children}</div>;
};
const cssVariablesCss = css({
  "--cl-panel-bg": colorMod("#445060", "v-3 s-5"),
  "--cl-head-part-bg": colorMod("#444850", "s-3 v-6"),
  "--cl-body-part-bg": colorMod("#444850", "s-10 v-10"),
  "--cl-knob-bg": colorMod("#445", "h-20 s-8 v+5"),
  "--cl-step-button-bg": colorMod("#565", "v23 s4"),
  "--cl-step-button-bg-alt": colorMod("#655", "v23 s4"),
  "--cl-piece-indicator-bg": colorMod("#666", "v-12"),
  "--cl-piece-operation-button-bg": colorMod("#445", "h-20 s-8 v+5"),
  "--cl-piece-active-button-bg": colorMod("#445", "h-20 s-8 v+5"),
});

//----------

export const PieceActiveButton = () => {
  return (
    <div className={clsx("w-8 h-8", "flex-c")}>
      <div className={clsx("w-6 h-6", "bg-(--cl-piece-active-button-bg)")} />
    </div>
  );
};

export const Knob = () => {
  return <div className={clsx("w-8 h-8", "bg-(--cl-knob-bg) rounded-full")} />;
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
  return (
    <div className={clsx("w-8 h-8", "bg-(--cl-piece-operation-button-bg)")} />
  );
};

export const StepButton = ({ altColor }: { altColor: boolean }) => {
  return (
    <div
      className={clsx(
        "w-5 h-8",
        altColor ? "bg-(--cl-step-button-bg-alt)" : "bg-(--cl-step-button-bg)",
      )}
    />
  );
};

export const PieceIndicator = () => {
  return <div className={clsx("w-2.5 h-8", "bg-(--cl-piece-indicator-bg)")} />;
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
      <div className={clsx("p-2.5", "bg-(--cl-head-part-bg)")}>{headPart}</div>
      <div className={clsx("p-2.5", "bg-(--cl-body-part-bg)")}>{bodyPart}</div>
    </div>
  );
};

export const PanelFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={clsx("flex-c", "w-[840px] h-[360px]", "bg-(--cl-panel-bg)")}
    >
      {children}
    </div>
  );
};
