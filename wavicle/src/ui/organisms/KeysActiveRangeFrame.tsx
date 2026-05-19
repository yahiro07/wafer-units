import { AluminaNode, css, domStyled, FC, jsx } from 'alumina';

type Props = {
  unitWidthPx: number;
  heightPx: number;
  activeRangeOffsetU: number;
  activeRangeSizeU: number;
  children: AluminaNode;
};

export const KeysActiveRangeFrame: FC<Props> = ({
  unitWidthPx,
  heightPx,
  activeRangeOffsetU,
  activeRangeSizeU,
  children,
}) => {
  const outerWidthPx = unitWidthPx * activeRangeSizeU;
  const innerLeftPx = -activeRangeOffsetU * unitWidthPx;

  return domStyled(
    <div>
      <div class="inner">{children}</div>
    </div>,
    css`
      position: relative;
      width: ${outerWidthPx}px;
      height: ${heightPx}px;
      overflow: hidden;
      box-sizing: content-box;

      > .inner {
        position: absolute;
        top: 0;
        left: ${innerLeftPx}px;
      }
    `
  );
};
