import { css, cz } from "@/common/css-realm";
import { uiColors } from "@/common/ui-theme";
import { SelectorOption } from "@/utils/selector-option";
import { flexH, npx } from "@/utils/utility-styles";

type Props<T extends string | number> = {
  className?: string;
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size: "narrow" | "wide";
};

export const ButtonsSelector = <T extends string | number>({
  className,
  options,
  value,
  onChange,
  size,
}: Props<T>) => {
  return (
    <div class={cz(style, className, `--${size}`)}>
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
  background: "#222",
  borderRadius: npx(2),
  padding: npx(1),
  "> button": {
    border: "inset 1px #4448",
    background: uiColors.clButtonBg,
    color: "#fff",
    borderRadius: npx(2),
    cursor: "pointer",

    "&.--active": {
      background: uiColors.clPrimary,
      color: "#000",
    },
  },
  "&.--narrow > button": {
    width: npx(40),
    height: npx(32),
  },
  "&.--wide > button": {
    width: npx(48),
    height: npx(34),
  },
});
