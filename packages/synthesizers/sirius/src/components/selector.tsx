import { SelectorOption } from "@/utils/selector-option";
import { css } from "@twind/core";

export const Selector = <T extends string | number>({
  value,
  onChange,
  options,
  width = 160,
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
  base: css({
    "@apply":
      "text-center outline-none cursor-pointer appearance-none rounded-[1px] hover:opacity-80",
    border: "solid 1px theme('colors.clSectionEdge')",
    padding: "0 8px",
  }),
};
