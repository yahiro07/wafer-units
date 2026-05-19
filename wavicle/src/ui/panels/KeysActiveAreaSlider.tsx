import { FC, domStyled, jsx, css } from 'alumina';
import { appConfig } from '~/base';
import { appStore } from '~/store';
import { KeysBlock, KeysRangeGauge } from '../organisms';

export const KeysActiveAreaSlider: FC = () => {
  const { bottomNoteNumber, numKeys } = appConfig;
  const { holdNoteNumbers } = appStore.synthEngine;
  const {
    state: { keyRangeOffset, keysRangeSize },
    actions: { setKeyRangeOffset },
  } = appStore.uiPresenter;
  const unitWith = 10;
  const height = 33;

  return domStyled(
    <div>
      <KeysBlock
        unitWidth={unitWith}
        height={height}
        bottomNoteNumber={bottomNoteNumber}
        numKeys={numKeys}
        holdNoteNumbers={holdNoteNumbers}
        showCenterCMark={true}
        isMainKeys={false}
      />
      <div class="cover">
        <KeysRangeGauge
          unitWidthPx={unitWith}
          heightPx={height}
          bottomNoteNumber={bottomNoteNumber}
          numKeys={numKeys}
          activeRangeOffsetU={keyRangeOffset}
          activeRangeSizeU={keysRangeSize}
          onScrollActiveRange={setKeyRangeOffset}
        />
      </div>
    </div>,
    css`
      position: relative;
      > .cover {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
      }
    `
  );
};
