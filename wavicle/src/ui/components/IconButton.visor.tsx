import { jsx } from 'alumina';
import { IconButton } from './IconButton';

export default {
  main: () => (
    <IconButton
      iconSpec="fa-solid fa-gear"
      onClick={() => alert('clicked')}
      size={32}
    />
  ),
  disabled: () => (
    <IconButton
      iconSpec="fa-solid fa-gear"
      onClick={() => alert('clicked')}
      size={32}
      disabled={true}
    />
  ),
};
