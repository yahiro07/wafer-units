import { asyncRerender, css, domStyled, FC, jsx, useLocal } from 'alumina';
import { nums, startDragSessionRelative } from '~/funcs';
import { useUiThemeContext, commonTransitionSec } from '../base';

type Props = {
  value: number;
  onChange(value: number): void;
  size: number;
};

export const ParameterKnob: FC<Props> = ({ value, onChange, size }) => {
  const uiTheme = useUiThemeContext();

  const activeColor = uiTheme.colors.clControlHighlight;

  const baseSize = 100;
  const hsz = baseSize / 2;
  const viewBoxSpec = `${-hsz} ${-hsz} ${baseSize} ${baseSize}`;

  const markerWidth = 10;

  const angleHalfRange = 145;
  const markerAngle = nums.lerpMap(
    value,
    0,
    1,
    270 - angleHalfRange,
    270 + angleHalfRange
  );
  const markerTransformSpec = `rotate(${markerAngle})`;

  const local = useLocal({ dragging: false });

  const onKnobPointerDown = (e: PointerEvent) => {
    const originalValue = value;
    local.dragging = true;
    startDragSessionRelative(e, {
      moveHandler(delta) {
        const newValue = nums.clamp(originalValue - delta.y * 0.01, 0, 1);
        onChange(newValue);
        asyncRerender();
      },
      upHandler() {
        local.dragging = false;
        asyncRerender();
      },
    });
  };

  return domStyled(
    <div>
      <div class="cover" />
      <svg viewBox={viewBoxSpec} class={local.dragging && '--dragging'}>
        <circle
          class="knob"
          cx={0}
          cy={0}
          r={hsz - 1}
          onPointerDown={onKnobPointerDown}
        />
        <circle class="knob_inner" cx={0} cy={0} r={hsz - 10} />
        <g class="marker" transform={markerTransformSpec}>
          <line x1={hsz * 0.25} y1={0} x2={hsz - 5} y2={0} />
        </g>
      </svg>
    </div>,
    css`
      filter: drop-shadow(1px 3px 5px #0005);

      > svg {
        width: ${size}px;
        height: ${size}px;

        > .knob {
          fill: #ccc;
          cursor: pointer;
          transition: stroke ${commonTransitionSec};
          stroke-width: 2px;
          stroke: transparent;
        }

        > .knob_inner {
          fill: #e8e8e8;
          pointer-events: none;
        }

        > .marker {
          stroke: #f80;
          stroke-width: ${markerWidth};
          pointer-events: none;
          transition: stroke ${commonTransitionSec};
        }

        &:hover,
        &.--dragging {
          > .marker {
            stroke: ${activeColor};
          }
          > .knob {
            stroke: ${activeColor};
          }
        }
      }
    `
  );
};
