import { jsx } from 'alumina';
import { GeneralSelector } from './GeneralSelector';

const options1 = ['apple', 'orange', 'banana'];
export default {
  main: () => (
    <GeneralSelector
      options={options1}
      value="apple"
      onChange={() => {}}
      width={150}
    />
  ),
};
