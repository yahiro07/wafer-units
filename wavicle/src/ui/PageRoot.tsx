import { css, domStyled, jsx } from 'alumina';
import { appEnv } from '~/base';
import { appStore } from '~/store';
import { MainPanel } from './MainPanel';
import {
  uiThemeContextValueDefault,
  uiThemeContext,
  switchFontByLanguage,
  uiFontFamilyMainFont,
  uiFontFamilyMainFontJa,
} from './base';
import { ScalerBox } from './components';
import { UsagePanel } from './panels';

export const PageRoot = () => {
  const { languageKey, usagePanelVisible } = appStore.uiPresenter.state;
  const uiTheme = { ...uiThemeContextValueDefault, languageKey };

  const mainFontFamily = switchFontByLanguage(
    uiFontFamilyMainFont,
    uiFontFamilyMainFontJa
  );
  return domStyled(
    <uiThemeContext.Provider value={uiTheme}>
      <div>
        <ScalerBox contentWidth={800} contentHeight={450} class="scaler-box">
          <MainPanel />
        </ScalerBox>
        <UsagePanel if={usagePanelVisible} />
      </div>
    </uiThemeContext.Provider>,
    css`
      width: 100%;
      height: 100%;
      background: #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${appEnv.isPc ? '3%' : 0};
      touch-action: none;

      font-family: ${mainFontFamily}, sans-serif;

      > .scaler-box > .bg-plane {
        background: url('./images/marble.png');
        background-size: cover;
        border-radius: 2px;
      }
    `
  );
};
