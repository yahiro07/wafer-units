import { css, domStyled, FC, jsx } from 'alumina';
import { rgbTranslucent } from '~/funcs';
import { appStore } from '~/store';
import { cssCommonTransitionSpec, useUiThemeContext } from '../base';

export const LanguageSelectionPart: FC = () => {
  const { clForeground, clControlHighlight } = useUiThemeContext().colors;

  const {
    state: { languageKey },
    actions: { setLanguageKey },
  } = appStore.uiPresenter;
  const activeColor = useUiThemeContext().colors.clControlHighlight;

  return domStyled(
    <div>
      <div
        class={languageKey === 'en' && '--active'}
        onClick={() => setLanguageKey('en')}
      >
        EN
      </div>
      <div
        class={languageKey === 'ja' && '--active'}
        onClick={() => setLanguageKey('ja')}
      >
        JA
      </div>
    </div>,
    css`
      display: flex;
      justify-content: flex-end;
      margin: 4px;
      > div {
        border: solid 1px ${clForeground};
        padding: 2px 4px;
        font-size: 13px;
        cursor: pointer;

        &.--active {
          background: ${rgbTranslucent(clControlHighlight, 0.4)};
        }

        ${cssCommonTransitionSpec};
        &:hover {
          border-color: ${rgbTranslucent(activeColor, 0.5)};
        }
      }
    `
  );
};
