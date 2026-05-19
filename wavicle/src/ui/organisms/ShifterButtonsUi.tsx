import { css, domStyled, FC, jsx } from "alumina";
import { INumberDirection } from "@/base";
import { IconFontIcon, PadButton } from "../components";

export const ShifterButtonsUi: FC<{
  canGoPrev: boolean;
  canGoNext: boolean;
  onShift(dir: INumberDirection): void;
}> = ({ canGoPrev, canGoNext, onShift }) => {
  const padButtonHeight = 30;
  const fontSize = 20;
  return domStyled(
    <div>
      <PadButton
        height={padButtonHeight}
        onClick={() => onShift(-1)}
        disabled={!canGoPrev}
      >
        <IconFontIcon spec="ph-caret-left-fill" size={fontSize} />
      </PadButton>
      <PadButton
        height={padButtonHeight}
        onClick={() => onShift(1)}
        disabled={!canGoNext}
      >
        <IconFontIcon spec="ph-caret-right-fill" size={fontSize} />
      </PadButton>
    </div>,
    css`
      display: flex;
      gap: 6px;
    `,
  );
};
