import { css } from "@emotion/react";
import { flexCentered, flexHorizontal, npx } from "mofur/ax-ui";
import { ReactNode } from "react";

const colors = {
  panelBg: "#888",
};

export const Knob = () => {
  return <div />;
};

export const StepButton = () => {
  return <div />;
};

export const PieceIndicator = () => {
  return <div />;
};

export const PieceRowFrame = ({
  headPart,
  bodyPart,
}: {
  headPart: ReactNode;
  bodyPart: ReactNode;
}) => {
  return (
    <div css={cssPieceRowFrame}>
      <div className="head-part">{headPart}</div>
      <div className="body-part">{bodyPart}</div>
    </div>
  );
};
const cssPieceRowFrame = css({
  ...flexHorizontal(),
  "& > .head-part": {
    padding: npx(8),
    background: "#aaa",
  },
  "& > .body-part": {
    padding: npx(8),
    background: "#999",
  },
});

export const PieceOperationButton = () => {
  return <div />;
};

export const PanelFrame = ({ children }: { children: ReactNode }) => {
  return <div css={cssPanelFrame}>{children}</div>;
};
const cssPanelFrame = css({
  width: npx(620),
  height: npx(380),
  ...flexCentered(),
  background: colors.panelBg,
});
