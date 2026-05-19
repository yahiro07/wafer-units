import { ILanguageKey } from './types';

export type IInstrumentKey =
  | 'piano'
  | 'elepi'
  | 'celesta'
  | 'guitar'
  | 'bell'
  | 'ocarina'
  | 'bass1'
  | 'bass2'
  | 'pluck1'
  | 'pluck2'
  | 'pluck3'
  | 'pluck4'
  | 'brass1'
  | 'brass2'
  | 'lead1'
  | 'lead2'
  | 'lead3'
  | 'lead4'
  | 'pad1'
  | 'pad2'
  | 'strings1'
  | 'strings2'
  | 'orchestra'
  | 'nes';

const instrumentsMap: [IInstrumentKey, string, string][] = [
  ['piano', 'Piano', 'ピアノ'],
  ['elepi', 'Electric Piano', 'エレピ'],
  ['celesta', 'Celesta', 'チェレスタ'],
  ['guitar', 'Guitar', 'ギター'],
  ['bell', 'Bell', 'ベル'],
  ['ocarina', 'Ocarina', 'オカリナ'],

  ['bass1', 'Bass1', 'ベース1'],
  ['bass2', 'Bass2', 'ベース2'],

  ['pluck1', 'Pluck1', 'プラック1'],
  ['pluck2', 'Pluck2', 'プラック2'],
  ['pluck3', 'Pluck3', 'プラック3'],
  ['pluck4', 'Pluck4', 'プラック4'],

  ['brass1', 'Brass1', 'ブラス1'],
  ['brass2', 'Brass2', 'ブラス2'],

  ['lead1', 'Lead1', 'リード1'],
  ['lead2', 'Lead2', 'リード2'],
  ['lead3', 'Lead3', 'リード3'],
  ['lead4', 'Lead4', 'リード4'],

  ['pad1', 'Pad1', 'パッド1'],
  ['pad2', 'Pad2', 'パッド2'],

  ['strings1', 'Strings1', 'ストリングス1'],
  ['strings2', 'Strings2', 'ストリングス2'],

  ['orchestra', 'Orchestra', 'オーケストラ'],
  ['nes', 'NES', 'ファミコン'],
];

export const allInstrumentKeys = instrumentsMap.map((it) => it[0]);

export function getInstrumentLabel(
  instrumentKey: IInstrumentKey,
  lang: ILanguageKey
): string {
  const index = lang === 'ja' ? 2 : 1;
  const entry = instrumentsMap.find((it) => it[0] === instrumentKey);
  return entry?.[index] || 'err';
}
