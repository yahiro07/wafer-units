import { jsx } from 'alumina';
import { IconFontIcon } from './IconFontIcon';
import { PadButton } from './PadButton';

export default {
  large: () => <PadButton height={100}>aa</PadButton>,
  normal: () => <PadButton height={40}>aa</PadButton>,
  small: () => <PadButton height={26}>aa</PadButton>,
  small_rect: () => (
    <PadButton height={26} asr={1}>
      aa
    </PadButton>
  ),
  actual_usage: () => (
    <PadButton height={30}>
      <IconFontIcon spec="ph-caret-left-fill" size={22} />
    </PadButton>
  ),
};
