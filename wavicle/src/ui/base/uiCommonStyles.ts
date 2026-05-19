import { css } from 'alumina';
import { useUiThemeContext } from './uiThemeContext';

export const commonTransitionSec = `0.25s`;

export const cssCommonTransitionSpec = css`
  transition: all ${commonTransitionSec} linear;
`;

export const uiFontFamilyMainFont = `Roboto`;
export const uiFontFamilyMainFontJa = `'Noto Sans JP'`;

export const uiFontFamilyPanelFontJa = `'M PLUS 1p'`;

export const uiFontFamilySpecAppTitle = `Orbitron, sans-serif`;
export const uiFontFamilySpecPrimaryLabels = `Oxanium, sans-serif`;
export const uiFontFamilySpecPrimaryLabelsJa = `${uiFontFamilyPanelFontJa}, sans-serif`;

export const uiFontFamilySpecKeyLabels = `Play, sans-serif`;

export const uiFontFamilyLcd = 'Play';

export function switchFontByLanguage(
  fontFamilyEn: string,
  fontFamilyJa: string
) {
  const { languageKey } = useUiThemeContext();
  if (languageKey === 'ja') {
    return fontFamilyJa;
  } else {
    return fontFamilyEn;
  }
}

export function switchFontSizeByLanguage(sizeEn: string, sizeJa: string) {
  const { languageKey } = useUiThemeContext();
  if (languageKey === 'ja') {
    return sizeJa;
  } else {
    return sizeEn;
  }
}
