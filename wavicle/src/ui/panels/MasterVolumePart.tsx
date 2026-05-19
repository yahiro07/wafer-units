import { FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { ParameterSlider } from '../components';

export const MasterVolumePart: FC = () => {
  const { masterVolume, setMasterVolume } = appStore.synthEngine;
  return (
    <div>
      <label>master volume</label>
      <ParameterSlider value={masterVolume} onChange={setMasterVolume} />
    </div>
  );
};
