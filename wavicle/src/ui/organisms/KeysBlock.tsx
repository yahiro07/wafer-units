import { asyncRerender, css, domStyled, FC, jsx, useLocal } from 'alumina';
import { IKeyHoldEvent } from '~/base';
import {
  arrays,
  preventDefaultHandler,
  startDragSessionRelative,
} from '~/funcs';
import { uiFontFamilySpecKeyLabels } from '../base';
import { keysBlockHelpers } from './keysBlockHelpers';

type IKeyLabelOptions = {
  rootNoteNumber: number;
  labels: string[];
};
type Props = {
  unitWidth: number;
  height: number;
  bottomNoteNumber: number;
  numKeys: number;
  holdNoteNumbers?: number[];
  onKeyHoldEvent?(ev: IKeyHoldEvent): void;
  labelOptions?: IKeyLabelOptions;
  showCenterCMark?: boolean;
  isMainKeys: boolean;
};

function getKeyLabel(
  noteNumber: number,
  labelOptions: IKeyLabelOptions | undefined
): string | undefined {
  if (!labelOptions) {
    return undefined;
  }
  const index = noteNumber - labelOptions.rootNoteNumber;
  return labelOptions.labels[index];
}

export const KeysBlock: FC<Props> = ({
  unitWidth,
  height,
  bottomNoteNumber,
  numKeys,
  holdNoteNumbers,
  onKeyHoldEvent,
  labelOptions,
  showCenterCMark,
  isMainKeys,
}) => {
  const labelColor = '#f80b';

  const { getKeyOffsetInUnits, getKeysOuterWidthU, checkBlackKey } =
    keysBlockHelpers;
  const noteNumbers = arrays.range(
    bottomNoteNumber,
    bottomNoteNumber + numKeys - 1
  );
  const baseOffset = getKeyOffsetInUnits(bottomNoteNumber, true);
  const blackHeight = height * 0.63;
  const blackKeyWidth = unitWidth * 0.65;

  const outerWidthU = getKeysOuterWidthU(bottomNoteNumber, numKeys);
  const outerWidthPx = unitWidth * outerWidthU + 1;

  const local = useLocal({
    playingNoteNumber: undefined as number | undefined,
  });

  const playTone = (noteNumber: number) => {
    onKeyHoldEvent?.({ noteNumber, hold: true });
    local.playingNoteNumber = noteNumber;
  };

  const stopTone = () => {
    if (local.playingNoteNumber) {
      onKeyHoldEvent?.({ noteNumber: local.playingNoteNumber, hold: false });
      local.playingNoteNumber === undefined;
    }
  };

  const onKeyPointerDown = (e0: PointerEvent, noteNumber: number) => {
    playTone(noteNumber);
    startDragSessionRelative(e0, {
      moveHandler(_, e1) {
        const el = document.elementFromPoint(
          e1.clientX,
          e1.clientY
        ) as HTMLElement;
        if (el?.classList.contains('keyblocks-playable-key')) {
          const newNoteNumber = parseInt(el.dataset['noteNumber'] || '');
          if (isFinite(newNoteNumber)) {
            if (newNoteNumber !== local.playingNoteNumber) {
              stopTone();
              playTone(newNoteNumber);
              asyncRerender();
            }
          }
        }
      },
      upHandler() {
        stopTone();
        asyncRerender();
      },
    });
  };

  const canPlay = !!onKeyHoldEvent;

  const br2 = (unitWidth / 10) >> 0;
  const boarderSpecWhite = `0 0 ${br2}px ${br2}px`;

  const labelVisible = !!labelOptions;

  return domStyled(
    <div>
      {noteNumbers.map((noteNumber) => {
        const isBlackKey = checkBlackKey(noteNumber);
        const offset = getKeyOffsetInUnits(noteNumber) - baseOffset;
        const left = offset * unitWidth;
        const hold = holdNoteNumbers?.includes(noteNumber);
        const label = getKeyLabel(noteNumber, labelOptions);
        const showMark = noteNumber === 60 && showCenterCMark;

        return (
          <div
            key={noteNumber}
            class={[
              'key',
              isBlackKey && '--black',
              hold && '--hold',
              canPlay && '--can-play',
              canPlay && 'keyblocks-playable-key',
            ]}
            style={{ left: `${left}px` }}
            onPointerDown={
              (canPlay && ((e) => onKeyPointerDown(e, noteNumber))) || undefined
            }
            onTouchStart={preventDefaultHandler}
            data-note-number={noteNumber}
          >
            <div if={showMark} class="center-c-mark" />
            <div if={label} class="label">
              {label}
            </div>
          </div>
        );
      })}
      <div class="cover" if={isMainKeys} />
    </div>,
    css`
      position: relative;
      width: ${outerWidthPx}px;
      height: ${height}px;

      > .key {
        position: absolute;
        top: 0;
        border: solid 1px #222;
        width: ${unitWidth}px;
        height: ${height}px;
        background: #fff;
        font-family: ${uiFontFamilySpecKeyLabels};
        font-size: 14px;
        color: ${labelColor};

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: ${boarderSpecWhite};

        &.--black {
          background-color: #000;
          background-image: url('./images/black_key_texture.svg');
          background-size: cover;
          background-position: center bottom;

          width: ${blackKeyWidth}px;
          height: ${blackHeight}px;
          transform: translateX(${-blackKeyWidth / 2}px);
          z-index: 1;
          border-radius: 0;
        }

        transition: all 0.15s linear;

        &.--hold {
          background: #8f8;
        }

        &.--can-play {
          cursor: pointer;
        }

        > .center-c-mark {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${labelColor};
          margin-bottom: ${isMainKeys && !labelVisible ? '10px' : '2px'};
        }

        > .label {
          margin-top: 2px;
          margin-bottom: 7px;
        }

        &.--black > .label {
          margin-bottom: 21px;
        }
      }

      > .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: inset 0px 2px 6px #0004;
        z-index: 2;
        pointer-events: none;
      }
    `
  );
};
