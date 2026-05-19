import { css, jsx } from 'alumina';
import { IconFontIcon } from './IconFontIcon';

const redStyle = css`
  color: red;
`;

export default {
  fontAwesome: <IconFontIcon spec="fa-solid fa-bars" size={24} />,
  material_icons: <IconFontIcon spec="mi settings" size={24} />,
  remix_icon: <IconFontIcon spec="ri-pencil-fill" size={24} />,
  tabler: <IconFontIcon spec="ti-settings" size={24} />,
  phosphor: <IconFontIcon spec="ph-smiley" size={24} />,
  //
  large: <IconFontIcon spec="ri-pencil-fill" size={48} />,
  small: <IconFontIcon spec="ri-pencil-fill" size={16} />,
  colored: <IconFontIcon spec="mi settings" size={24} class={redStyle} />,
  //
  ti_info: <IconFontIcon spec="ti-info-circle" size={24} />,
};
