import { asyncRerender } from 'alumina';
import { IPcKeyboardRootNoteGetter, ISynthesizerBase } from '~/base';

type IKeySequenceEntry = {
  octave: number;
  keysSequence: string;
};

const keySequenceEntries1: IKeySequenceEntry[] = [
  {
    octave: 0,
    keysSequence: 'zsxdcvgbhnjm,l.;/',
  },
  {
    octave: 1,
    keysSequence: 'q2w3er5t6y7ui9o0p',
  },
];

function getNoteNumberFromKey(
  key: string,
  rootNoteGetter: IPcKeyboardRootNoteGetter
): number | undefined {
  const keySequenceEntries = keySequenceEntries1;
  const rootNoteNumber = rootNoteGetter.getRootNoteNumber();
  for (const ke of keySequenceEntries) {
    const index = ke.keysSequence.indexOf(key);
    if (index >= 0) {
      const noteNumber = rootNoteNumber + ke.octave * 12 + index;
      return noteNumber;
    }
  }
  return undefined;
}

const keyToNoteNumberMap = new Map<string, number>();

export function setupPcKeyboardHandler(
  synth: ISynthesizerBase,
  rootNoteGetter: IPcKeyboardRootNoteGetter
) {
  const keyHandler = (key: string, isDown: boolean) => {
    if (isDown) {
      const nn = getNoteNumberFromKey(key, rootNoteGetter);
      if (nn === undefined) return;
      synth.noteOn(nn);
      keyToNoteNumberMap.set(key, nn);
    } else {
      const nn = keyToNoteNumberMap.get(key);
      if (nn !== undefined) {
        synth.noteOff(nn);
        keyToNoteNumberMap.delete(key);
      }
    }
    asyncRerender();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    keyHandler(e.key, true);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    keyHandler(e.key, false);
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}
