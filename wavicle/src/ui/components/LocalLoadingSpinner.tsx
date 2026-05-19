import { FC, domStyled, css, jsx } from 'alumina';
import { IconFontIcon } from './IconFontIcon';

export const LocalLoadingSpinner: FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  return domStyled(
    <IconFontIcon
      spec="ph-spinner"
      size={24}
      class={isLoading && '--visible'}
    />,
    css`
      @keyframes rotation1 {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      animation: 2s linear infinite rotation1;

      visibility: hidden;
      &.--visible {
        visibility: visible;
      }
    `
  );
};
