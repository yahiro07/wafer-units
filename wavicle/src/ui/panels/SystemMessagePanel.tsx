import { FC, domStyled, jsx, css } from 'alumina';
import { appStore } from '~/store';
import { useUiThemeContext, useUiTexts } from '../base';

export const SystemMessagePanel: FC = () => {
  const { needUserActionForAudioOutput } = appStore.uiPresenter.readers;
  const uiTexts = useUiTexts();
  const uiTheme = useUiThemeContext();
  return domStyled(
    <div>
      <div if={needUserActionForAudioOutput}>
        {uiTexts.msgNeedTapSomewhereToEnableAudioOutput}
      </div>
    </div>,
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 14px;
      margin-top: 4px;
      color: ${uiTheme.colors.systemMessage};
    `
  );
};
