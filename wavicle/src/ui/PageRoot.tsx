import { css, domStyled, jsx } from "alumina";
import { appStore } from "@/store";
import {
  switchFontByLanguage,
  uiFontFamilyMainFont,
  uiFontFamilyMainFontJa,
  uiThemeContext,
  uiThemeContextValueDefault,
} from "./base";
import { ScalerBox } from "./components";
import { MainPanel } from "./MainPanel";
import { UsagePanel } from "./panels";

export const PageRoot = () => {
  const { languageKey, usagePanelVisible } = appStore.uiPresenter.state;
  const uiTheme = { ...uiThemeContextValueDefault, languageKey };

  const mainFontFamily = switchFontByLanguage(
    uiFontFamilyMainFont,
    uiFontFamilyMainFontJa,
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
      width: 100dvw;
      height: 100dvh;
      background: #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
      padding: 1%;
      font-family: ${mainFontFamily}, sans-serif;

      > .scaler-box > .bg-plane {
        background: url('./images/marble.png');
        background-size: cover;
        border-radius: 2px;
      }
    `,
  );
};
