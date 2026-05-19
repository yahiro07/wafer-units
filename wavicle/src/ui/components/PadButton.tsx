import { AluminaNode, css, domStyled, FC, jsx } from 'alumina';
import { rgbTranslucent } from '~/funcs';
import { useUiThemeContext, cssCommonTransitionSpec } from '../base';

type Props = {
  height: number;
  asr?: number;
  children: AluminaNode;
  onClick?(): void;
  disabled?: boolean;
};

export const PadButton: FC<Props> = ({
  height,
  asr = 1.25,
  children,
  onClick,
  disabled,
}) => {
  const { colors } = useUiThemeContext();
  const activeColor = colors.clControlHighlight;
  const width = (height * asr) >> 0;
  return domStyled(
    <div>
      <div onClick={onClick} class={['inner', disabled && '--disabled']}>
        {children}
      </div>
    </div>,
    css`
      width: ${width}px;
      height: ${height}px;

      background: #0006;
      border-radius: 3px;
      padding: 1px;

      > .inner {
        filter: drop-shadow(1px 3px 5px #0003);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eee;
        border: solid 1px #bbb8;
        border-radius: 4px;
        color: #37a;
        cursor: pointer;

        ${cssCommonTransitionSpec};

        &:not(.--disabled) {
          &:hover {
            color: ${activeColor};
            border-color: ${activeColor};
          }
          &:active {
            background: ${rgbTranslucent(activeColor, 0.5)};
          }
        }

        &.--disabled {
          opacity: 0.4;
        }
      }
    `
  );
};
