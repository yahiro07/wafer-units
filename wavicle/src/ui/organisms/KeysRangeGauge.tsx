import { asyncRerender, css, domStyled, FC, jsx } from 'alumina';
import { nums, startDragSessionRelative } from '~/funcs';
import { keysBlockHelpers } from './keysBlockHelpers';

type Props = {
  unitWidthPx: number;
  heightPx: number;
  bottomNoteNumber: number;
  numKeys: number;
  activeRangeOffsetU: number;
  activeRangeSizeU: number;
  onScrollActiveRange(offsetU: number): void;
};
export const KeysRangeGauge: FC<Props> = ({
  unitWidthPx,
  heightPx,
  bottomNoteNumber,
  numKeys,
  activeRangeOffsetU,
  activeRangeSizeU,
  onScrollActiveRange,
}) => {
  const outerWidthU = keysBlockHelpers.getKeysOuterWidthU(
    bottomNoteNumber,
    numKeys
  );
  const outerWidthPx = unitWidthPx * outerWidthU;

  const innerLeftPx = activeRangeOffsetU * unitWidthPx;
  const innerWidthPx = activeRangeSizeU * unitWidthPx;

  const onGaugePointerDown = (e: PointerEvent) => {
    startDragSessionRelative(e, {
      moveHandler(delta) {
        const modOffset = nums.clamp(
          activeRangeOffsetU + delta.x / unitWidthPx,
          0,
          outerWidthU - activeRangeSizeU
        );
        onScrollActiveRange(modOffset);
        asyncRerender();
      },
    });
  };

  return domStyled(
    <div>
      <div class="inner" onPointerDown={onGaugePointerDown} />
    </div>,
    css`
      position: relative;
      width: ${outerWidthPx}px;
      height: ${heightPx}px;
      > .inner {
        position: absolute;
        z-index: 2;
        top: 0;
        left: ${innerLeftPx}px;
        width: ${innerWidthPx}px;
        height: ${heightPx}px;
        background: #f804;
        cursor: pointer;
        box-sizing: border-box;
        border: solid 1px #f806;

        &:hover {
          border: solid 1px #f80b;
        }
      }
    `
  );
};
