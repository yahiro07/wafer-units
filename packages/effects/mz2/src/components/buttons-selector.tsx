import { css } from "@/common/css-realm";
import { uiColors } from "@/common/ui-theme";
import { cz } from "@/utils/cz";
import { SelectorOption } from "@/utils/selector-option";
import { flexH, npx } from "@/utils/utility-styles";

type Props<T extends string | number> = {
  className?: string;
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export const ButtonsSelector = <T extends string | number>({
  className,
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <div class={cz(style, className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          class={cz(value === opt.value && "--active")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
const style = css({
  ...flexH(),
  background: "#444",
  borderRadius: npx(2),
  padding: npx(1),
  "> button": {
    width: npx(45),
    height: npx(40),
    border: "inset 1px #4448",
    fontWeight: 500,
    background: uiColors.clButtonBg,
    color: "#fff",
    borderRadius: npx(2),
    cursor: "pointer",

    "&.--active": {
      background: uiColors.clPrimary,
      // color: "#000",
    },
  },
});
