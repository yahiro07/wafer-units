import { jsx } from 'alumina';
import { KeysBlock } from './KeysBlock';

export default {
  full: () => (
    <KeysBlock
      unitWidth={10}
      height={30}
      bottomNoteNumber={21}
      numKeys={88}
      isMainKeys={false}
    />
  ),
  oct2: () => (
    <KeysBlock
      unitWidth={30}
      height={120}
      bottomNoteNumber={60}
      numKeys={25}
      isMainKeys={true}
    />
  ),
  withHighlight: () => (
    <KeysBlock
      unitWidth={10}
      height={30}
      bottomNoteNumber={48}
      numKeys={37}
      holdNoteNumbers={[60, 64, 67]}
      isMainKeys={false}
    />
  ),
};
