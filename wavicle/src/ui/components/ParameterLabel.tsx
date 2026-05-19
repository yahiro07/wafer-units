import { css, domStyled, FC, jsx } from 'alumina';
import { ILanguageKey } from '~/base';
import { appStore } from '~/store';
import {
  uiFontFamilySpecPrimaryLabels,
  uiFontFamilySpecPrimaryLabelsJa,
} from '../base';

type Props = {
  text: string;
};

function getCssLabelFontSpec(langKey: ILanguageKey, baseSize: number = 16) {
  if (langKey === 'ja') {
    return css`
      font-family: ${uiFontFamilySpecPrimaryLabelsJa};
      font-size: ${(baseSize * 0.9) >> 0}px;
      display: flex;
      align-items: center;
      height: ${(baseSize * 1.5) >> 0}px;
    `;
  } else {
    return css`
      font-family: ${uiFontFamilySpecPrimaryLabels};
      font-size: ${(baseSize * 1.0) >> 0}px;
      height: ${(baseSize * 1.5) >> 0}px;
      display: flex;
      align-items: center;
    `;
  }
}

export const ParameterLabel: FC<Props> = ({ text }) => {
  const { languageKey } = appStore.uiPresenter.state;
  return domStyled(
    <div>{text}</div>,
    css`
      ${getCssLabelFontSpec(languageKey)};
    `
  );
};
