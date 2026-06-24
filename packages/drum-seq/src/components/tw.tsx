import { css } from "@emotion/react";
import clsx from "clsx";
import { ReactNode } from "react";

export const CssVariablesFrame = ({ children }: { children: ReactNode }) => {
  return <div css={cssVariablesCss}>{children}</div>;
};
const cssVariablesCss = css({
  "--cl-panel-bg": "#456",
  "--cl-head-part-bg": "#444455",
  "--cl-body-part-bg": "#55555a",
  "--cl-knob-bg": "#778",
  "--cl-step-button-bg": "#666",
  "--cl-piece-indicator-bg": "#666",
});

//----------

export const Knob = () => {
  return <div className={clsx("w-8 h-8", "bg-gray-400 rounded-full")} />;
};

export const PieceNameBox = ({ pieceName }: { pieceName: string }) => {
  return (
    <div
      className={clsx(
        "w-[80px] h-8",
        "flex-ha",
        "overflow-hidden text-ellipsis whitespace-nowrap",
        "text-white",
      )}
    >
      {pieceName}
    </div>
  );
};

export const PieceOperationButton = () => {
  return <div className={clsx("w-8 h-8", "bg-(--cl-knob-bg)")} />;
};

export const StepButton = () => {
  return <div className={clsx("w-5 h-8", "bg-(--cl-step-button-bg)")} />;
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
      <div className={clsx("p-2", "bg-(--cl-head-part-bg)")}>{headPart}</div>
      <div className={clsx("p-2", "bg-(--cl-body-part-bg)")}>{bodyPart}</div>
    </div>
  );
};

export const PanelFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={clsx("flex-c", "w-[840px] h-[320px]", "bg-(--cl-panel-bg)")}
    >
      {children}
    </div>
  );
};
