import { FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { ShifterButtonsUi } from '../organisms';

export const OctaveShifterPart: FC = () => {
  const {
    readers: { canShiftKeysOffsetLower, canShiftKeysOffsetHigher },
    actions: { shiftOctave },
  } = appStore.uiPresenter;
  return (
    <ShifterButtonsUi
      canGoPrev={canShiftKeysOffsetLower}
      canGoNext={canShiftKeysOffsetHigher}
      onShift={shiftOctave}
    />
  );
};
