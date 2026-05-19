import { css, FC, jsx } from 'alumina';
import { reflectFloatValue } from '~/funcs';

type Props = {
  value: number;
  onChange: (value: number) => void;
  width?: number;
  min?: number;
  max?: number;
  step?: number;
};

export const ParameterSlider: FC<Props> = ({
  value,
  onChange,
  width = 120,
  min = 0,
  max = 1,
  step = 0.01,
}) => {
  return (
    <input
      class={style}
      style={{ width: `${width}px` }}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onInput={reflectFloatValue(onChange)}
    />
  );
};

const style = css`
  cursor: pointer;
`;
