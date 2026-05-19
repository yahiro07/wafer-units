import { css, domStyled, FC, jsx } from 'alumina';
import { appConfig, appEnv, IKeyHoldEvent } from '~/base';
import { appStore } from '~/store';
import { KeysActiveRangeFrame, KeysBlock } from '../organisms';

const pcKeyboardKeyLabels = 'zsxdcvgbhnjmq2w3er5t6y7ui9o0p'
  .toUpperCase()
  .split('');

export const MainKeysPanel: FC = () => {
  const { bottomNoteNumber, numKeys } = appConfig;
  const { holdNoteNumbers, noteOn, noteOff } = appStore.synthEngine;
  const {
    state: { keyRangeOffset, keysRangeSize },
    readers: { pcKeyboardRootNoteNumber },
  } = appStore.uiPresenter;

  const edgeWidth = 2;
  const edgeWidth2 = 3;
  const unitWidth = appConfig.mainKeyUnitWidth;
  const height = 254;

  const handleKeyHoldEvent = (ev: IKeyHoldEvent) => {
    if (ev.hold) {
      noteOn(ev.noteNumber);
    } else {
      noteOff(ev.noteNumber);
    }
  };

  return domStyled(
    <KeysActiveRangeFrame
      unitWidthPx={unitWidth}
      heightPx={height}
      activeRangeOffsetU={keyRangeOffset}
      activeRangeSizeU={keysRangeSize}
    >
      <KeysBlock
        unitWidth={unitWidth}
        height={height}
        bottomNoteNumber={bottomNoteNumber}
        numKeys={numKeys}
        holdNoteNumbers={holdNoteNumbers}
        onKeyHoldEvent={handleKeyHoldEvent}
        labelOptions={
          (appEnv.isPc && {
            rootNoteNumber: pcKeyboardRootNoteNumber,
            labels: pcKeyboardKeyLabels,
          }) ||
          undefined
        }
        showCenterCMark={true}
        isMainKeys={true}
      />
    </KeysActiveRangeFrame>,
    css`
      border-top: solid ${edgeWidth}px #0004;
      border-left: solid ${edgeWidth2}px #0004;
      border-right: solid ${edgeWidth2}px #fff6;
      padding-bottom: 8px;
    `
  );
};
