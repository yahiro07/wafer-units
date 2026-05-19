import { FC, domStyled, jsx, css } from 'alumina';
import { appStore } from '~/store';
import { IconButton } from '../components';

export const AppControlsPart: FC = () => {
  const { showUsagePanel } = appStore.uiPresenter.actions;
  const iconSize = 40;
  return domStyled(
    <div class="icon-buttons-box">
      <IconButton iconSpec="ph-info" size={iconSize} onClick={showUsagePanel} />
    </div>,
    css`
      display: flex;
      justify-content: flex-end;
    `
  );
};
