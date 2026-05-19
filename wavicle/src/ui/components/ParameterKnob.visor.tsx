import { jsx } from 'alumina';
import { fieldSetter } from '~/funcs';
import { ParameterKnob } from './ParameterKnob';

const state = {
  value: 0.5,
};

export default {
  large: () => (
    <ParameterKnob
      value={state.value}
      onChange={fieldSetter(state, 'value')}
      size={120}
    />
  ),
  main: () => (
    <ParameterKnob
      value={state.value}
      onChange={fieldSetter(state, 'value')}
      size={60}
    />
  ),
  small: () => (
    <ParameterKnob
      value={state.value}
      onChange={fieldSetter(state, 'value')}
      size={30}
    />
  ),
};
