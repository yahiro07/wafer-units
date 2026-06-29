import { Knob } from "@/components/knob";
import { SelectorOption } from "@/utils/selector-option";

export const OptionMappedKnob = <T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: number;
  onChange: (value: T) => void;
  options: SelectorOption<T>[];
}) => {
  const index = options.findIndex((option) => option.value === value);
  const num = options.length;
  const handleChange = (newIndex: number) => {
    onChange(options[newIndex].value);
  };
  return (
    <Knob
      value={index}
      min={0}
      max={num - 1}
      step={1}
      onChange={handleChange}
    />
  );
};
