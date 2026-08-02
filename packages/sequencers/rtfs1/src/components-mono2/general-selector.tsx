import { useMemo } from "preact/hooks";
import { SelectorOption } from "./selector-option";
import { CSSProperties } from "preact";

type Props<T extends string | number> = {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  reverseOptionsOrder?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function GeneralSelector<T extends string | number>({
  options,
  value,
  onChange,
  reverseOptionsOrder = false,
  className,
  style,
}: Props<T>) {
  const orderedOptions = useMemo(() => {
    if (reverseOptionsOrder) {
      return [...options].reverse();
    }
    return options;
  }, [options, reverseOptionsOrder]);

  const wrapOnChange = (e: Event) => {
    const isNumber = typeof options[0].value === "number";
    const el = e.target as HTMLSelectElement;
    const newValue = isNumber ? parseFloat(el.value) : el.value;
    onChange(newValue as T);
  };
  return (
    <select
      value={value}
      onChange={wrapOnChange}
      className={className}
      style={style}
    >
      {orderedOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
