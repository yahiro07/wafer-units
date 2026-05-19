import { createContext, useContext } from 'alumina';
import { ILanguageKey } from '~/base';

type IUiThemeContextValue = {
  languageKey: ILanguageKey;
  colors: {
    clPanelBody: string;
    clForeground: string;
    clControlHighlight: string;
    systemMessage: string;
  };
};

export const uiThemeContextValueDefault: IUiThemeContextValue = {
  languageKey: 'en',
  colors: {
    clPanelBody: '#aceefe88',
    clForeground: '#fff',
    clControlHighlight: '#0AF',
    systemMessage: '#F08',
  },
};
export const uiThemeContext = createContext<IUiThemeContextValue>(
  uiThemeContextValueDefault
);

export function useUiThemeContext() {
  return useContext(uiThemeContext);
}
