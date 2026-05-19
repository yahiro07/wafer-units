import { ILanguageKey } from '~/base';
import { appStore } from '~/store';

type IUiTextSet = {
  instrument: string;
  volume: string;
  release: string;
  midiIn: string;
  none: string;
  msgNeedTapSomewhereToEnableAudioOutput: string;
};

const uiTextSets: Record<ILanguageKey, IUiTextSet> = {
  en: {
    instrument: 'instrument',
    volume: 'volume',
    release: 'release',
    midiIn: 'MIDI IN',
    none: 'none',
    msgNeedTapSomewhereToEnableAudioOutput:
      'Click somewhere to enable audio output.',
  },
  ja: {
    instrument: '音色',
    volume: '音量',
    release: '余韻',
    midiIn: 'MIDI IN',
    none: 'なし',
    msgNeedTapSomewhereToEnableAudioOutput:
      '画面のどこかをクリックすると、オーディオ出力が有効になります。',
  },
};

export function useUiTexts(): IUiTextSet {
  const { languageKey } = appStore.uiPresenter.state;
  return uiTextSets[languageKey];
}
