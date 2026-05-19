import { css, domStyled, jsx } from 'alumina';
import { IconFontIcon } from './IconFontIcon';

type IIconKey =
  | 'settings'
  | 'sliders'
  | 'info'
  | 'play'
  | 'menu'
  | 'edit'
  | 'close'
  | 'power'
  | 'undo'
  | 'star'
  | 'search';

const iconKeyOrder: IIconKey[] = [
  'settings',
  'sliders',
  'info',
  'play',
  'menu',
  'edit',
  'close',
  'power',
  'undo',
  'star',
  'search',
];

type IIconLibraryEntry = {
  libraryName: string;
  iconSpecs: Record<IIconKey, string>;
};

const iconLibraryEntries: IIconLibraryEntry[] = [
  {
    libraryName: 'font awesome 6',
    iconSpecs: {
      settings: 'fa-solid fa-gear',
      sliders: 'fa-solid fa-sliders',
      info: 'fa-solid fa-circle-info',
      play: 'fa-solid fa-play',
      menu: 'fa-solid fa-bars',
      edit: 'fa-solid fa-pen-to-square',
      close: 'fa-solid fa-xmark',
      power: 'fa-solid fa-power-off',
      undo: 'fa-solid fa-rotate-left',
      star: 'fa-solid fa-star',
      search: 'fa-solid fa-magnifying-glass',
    },
  },
  {
    libraryName: 'material icons',
    iconSpecs: {
      settings: 'mi settings',
      sliders: 'mi tune',
      info: 'mi info',
      play: 'mi play_arrow',
      menu: 'mi menu',
      edit: 'mi edit',
      close: 'mi close',
      power: 'mi power_settings_new',
      undo: 'mi undo',
      star: 'mi star',
      search: 'mi search',
    },
  },
  {
    libraryName: 'material symbols',
    iconSpecs: {
      settings: 'mso settings',
      sliders: 'mso tune',
      info: 'mso info',
      play: 'mso play_arrow',
      menu: 'mso menu',
      edit: 'mso edit',
      close: 'mso close',
      power: 'mso power_rounded',
      undo: 'mso undo',
      star: 'mso star',
      search: 'mso search',
    },
  },
  {
    libraryName: 'bootstrap icons',
    iconSpecs: {
      settings: 'bi-gear-fill',
      sliders: 'bi-sliders',
      info: 'bi-info-circle',
      play: 'bi-play-fill',
      menu: 'bi-list',
      edit: 'bi-pencil-square',
      close: 'bi-x',
      power: 'bi-power',
      undo: 'bi-arrow-counterclockwise',
      star: 'bi-star-fill',
      search: 'bi-search',
    },
  },
  {
    libraryName: 'remix icons',
    iconSpecs: {
      settings: 'ri-settings-3-fill',
      sliders: 'ri-equalizer-fill',
      info: 'ri-information-line',
      play: 'ri-play-fill',
      menu: 'ri-menu-fill',
      edit: 'ri-edit-fill',
      close: 'ri-close-line',
      power: 'ri-shut-down-line',
      undo: 'ri-arrow-go-back-line',
      star: 'ri-star-fill',
      search: 'ri-search-line',
    },
  },
  {
    libraryName: 'tabler icons',
    iconSpecs: {
      settings: 'ti-settings',
      sliders: 'ti-adjustments-horizontal',
      info: 'ti-info-circle',
      play: 'ti-player-play',
      menu: 'ti-menu-2',
      edit: 'ti-edit',
      close: 'ti-square-x',
      power: 'ti-power',
      undo: 'ti-arrow-back-up',
      star: 'ti-star',
      search: 'ti-search',
    },
  },
  {
    libraryName: 'phosphor icons',
    iconSpecs: {
      settings: 'ph-gear-fill',
      sliders: 'ph-sliders-horizontal-bold',
      info: 'ph-info-bold',
      play: 'ph-play-fill',
      menu: 'ph-list-bold',
      edit: 'ph-pencil-line-fill',
      close: 'ph-x-bold',
      power: 'ph-power-bold',
      undo: 'ph-arrow-counter-clockwise-bold',
      star: 'ph-star-fill',
      search: 'ph-magnifying-glass-bold',
    },
  },
];

const sz = 30;

export default {
  all: domStyled(
    <table>
      <tbody>
        {iconLibraryEntries.map((le) => (
          <tr key={le.libraryName}>
            <td>{le.libraryName}</td>
            {iconKeyOrder.map((propKey) => (
              <td key={propKey}>
                <IconFontIcon size={sz} spec={le.iconSpecs[propKey]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>,
    css`
      font-size: 18px;
      td:first-child {
        text-align: left;
      }
      td {
        padding: 4px;
        text-align: center;
        vertical-align: center;
      }
    `
  ),
};
