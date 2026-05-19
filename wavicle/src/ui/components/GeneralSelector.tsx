import { css, domStyled, FC, jsx } from 'alumina';
import { reflectValue } from '~/funcs';
import {
  cssCommonTransitionSpec,
  ISelectorOption,
  switchFontByLanguage,
  switchFontSizeByLanguage,
  uiFontFamilyLcd,
  uiFontFamilyPanelFontJa,
  useUiThemeContext,
} from '../base';

interface Props {
  options: (string | ISelectorOption)[];
  value: string;
  onChange(value: string): void;
  width?: number;
  disabled?: boolean;
}

export const GeneralSelector: FC<Props> = ({
  options,
  value,
  onChange,
  width,
  disabled,
}) => {
  const style = (width && `width: ${width}px`) || undefined;

  const edgeWidth = 1;
  const activeColor = useUiThemeContext().colors.clControlHighlight;

  return domStyled(
    <select
      value={options.length > 0 ? value : ''}
      onChange={reflectValue(onChange)}
      disabled={disabled}
      onKeyDown={(e) => e.preventDefault()}
      style={style}
    >
      {options.map((it, idx) => {
        const value = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        return (
          <option value={value} key={idx}>
            {label}
          </option>
        );
      })}
    </select>,
    css`
      -webkit-appearance: none;
      border: none;
      border-radius: 2px;
      height: 32px;
      outline: none;

      cursor: pointer;
      padding-left: 6px;
      padding-top: 1px;

      user-select: none;

      background: #ecf0ec;
      color: #336;

      border-top: solid ${edgeWidth}px #0008;
      border-left: solid ${edgeWidth}px #0008;
      border-bottom: solid ${edgeWidth}px #eee8;
      border-right: solid ${edgeWidth}px #eee8;

      box-shadow: inset 1px 2px 4px #0003;

      font-family: ${switchFontByLanguage(
          uiFontFamilyLcd,
          uiFontFamilyPanelFontJa
        )},
        'sans-serif';

      font-size: ${switchFontSizeByLanguage('16px', '14px')};

      ${cssCommonTransitionSpec};
      &:hover {
        border-color: ${activeColor};
      }
    `
  );
};
