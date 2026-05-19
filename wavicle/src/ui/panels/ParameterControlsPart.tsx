import { css, domStyled, FC, jsx } from 'alumina';
import { appStore } from '~/store';
import { useUiTexts } from '../base/uiTexts';
import { ParameterKnob, ParameterLabel } from '../components';

export const ParameterControlsPart: FC = () => {
  const { instrumentParameters, setInstrumentParameter } = appStore.synthEngine;
  const knobSize = 50;
  const texts = useUiTexts();

  return domStyled(
    <div>
      <div>
        <ParameterLabel text={texts.volume} />
        <ParameterKnob
          value={instrumentParameters.volume}
          onChange={(val) => setInstrumentParameter('volume', val)}
          size={knobSize}
        />
      </div>
      <div>
        <ParameterLabel text={texts.release} />
        <ParameterKnob
          value={instrumentParameters.release}
          onChange={(val) => setInstrumentParameter('release', val)}
          size={knobSize}
        />
      </div>
    </div>,
    css`
      display: flex;
      gap: 15px;
      > div {
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `
  );
};
