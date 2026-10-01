import { cz } from "@/utils/cz";
import { SelectorOption } from "@/utils/selector-option";

export const Selector = <T extends string | number>({
  value,
  onChange,
  options,
  width = 180,
  height = 40,
}: {
  value: string;
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
  base: cz(
    "text-center outline-none cursor-pointer appearance-none rounded-[1px] bg-white",
    "text-18px",
    "hover:opacity-90",
  ),
};
