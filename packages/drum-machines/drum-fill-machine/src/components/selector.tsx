import { SelectorOption } from "@/utils/selector-option";
import { tz } from "@/common/setup-twind";

export const Selector = <T extends string | number>({
  value,
  onChange,
  options,
  width = 160,
  height = 40,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SelectorOption<T>[];
  width?: number;
  height?: number;
}) => {
  const isNumber = typeof value === "number";

  const handleOnChange = (e: Event) => {
    const target = e.currentTarget as HTMLSelectElement;
    let value = isNumber
      ? (parseFloat(target.value) as T)
      : (target.value as T);
    onChange(value);
  };
  return (
    <select
      value={value}
      onChange={handleOnChange}
      class={styles.base}
      style={{ width, height }}
    >
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};
const styles = {
  base: tz({
    "@apply": "text-center outline-none cursor-pointer rounded-[1px]",
    border: "solid 1px #888",
    padding: "0 8px",
  }),
};
