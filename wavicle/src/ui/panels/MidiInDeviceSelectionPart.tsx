import { FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { ISelectorOption } from '../base';
import { useUiTexts } from '../base/uiTexts';
import { GeneralSelector, ParameterLabel } from '../components';

export const MidiInDeviceSelectionPart: FC = () => {
  const { allDeviceEntries, currentDeviceId, selectDevice } =
    appStore.midiInputDriver;

  const texts = useUiTexts();

  const blankOption: ISelectorOption = { value: '', label: texts.none };
  const options: ISelectorOption[] = [
    blankOption,
    ...allDeviceEntries.map((it) => ({
      value: it.id,
      label: it.name,
    })),
  ];

  return (
    <div>
      <ParameterLabel text={texts.midiIn} />
      <div>
        <GeneralSelector
          options={options}
          value={currentDeviceId}
          onChange={selectDevice}
          width={120}
        />
      </div>
    </div>
  );
};
