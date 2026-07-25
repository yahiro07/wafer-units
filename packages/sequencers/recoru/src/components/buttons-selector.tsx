import { qu } from "@/common/css-realm";
import { Button } from "@/components/button";
import { SelectorOption } from "@/utils/selector-option";

export const ButtonsSelector = <T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) => {
  return (
    <div class={qu.flexHA().gap(2).it}>
      {options.map((option) => (
        <Button
          key={option.value}
          text={option.label}
          onClick={() => onChange(option.value)}
          active={value === option.value}
          className={qu.w(30).it}
        />
      ))}
    </div>
  );
};
