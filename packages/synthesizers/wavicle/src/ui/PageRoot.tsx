import { css, domStyled, jsx } from "alumina";
import { appStore } from "@/store";
import { MainPanelCompact } from "@/ui/MainPanelCompact";
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
  const { languageKey, usagePanelVisible, isCompactMode } =
    appStore.uiPresenter.state;
  const uiTheme = { ...uiThemeContextValueDefault, languageKey };

  const mainFontFamily = switchFontByLanguage(
    uiFontFamilyMainFont,
    uiFontFamilyMainFontJa,
  );
  return domStyled(
    <uiThemeContext.Provider value={uiTheme}>
      <div>
        {!isCompactMode ? (
          <ScalerBox contentWidth={800} contentHeight={450} class="scaler-box">
            <MainPanel />
          </ScalerBox>
        ) : (
          <ScalerBox contentWidth={400} contentHeight={225} class="scaler-box">
            <MainPanelCompact />
          </ScalerBox>
        )}
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
      font-family: ${mainFontFamily}, sans-serif;

      > .scaler-box > .bg-plane {
        background: url('./images/marble.png');
        background-size: cover;
        border-radius: 2px;
      }
    `,
  );
};
