import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";
import { SelectorOption } from "@/utils/selector-option";
import { Icons } from "@/components/icons";
import { uiColors } from "@/common/ui-theme";

export const ShifterFrame = ({
  children,
  onShift,
}: {
  children: ComponentChildren;
  onShift(dir: -1 | 1): void;
}) => {
  const handleClick = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      onShift(-1);
    } else {
      onShift(1);
    }
  };
  return <div onClick={handleClick}>{children}</div>;
};

export const ShiftSelector = <T extends string | number>({
  options,
  value,
  onChange,
  minWidth = 60,
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  minWidth?: number;
}) => {
  const currentIndex = options.findIndex((option) => option.value === value);
  const currentOption = options[currentIndex];
  const canShiftLeft = currentIndex > 0;
  const canShiftRight = currentIndex < options.length - 1;

  const handleShift = (dir: -1 | 1) => {
    const newIndex = currentIndex + dir;
    if (newIndex < 0) return;
    if (newIndex >= options.length) return;
    onChange(options[newIndex].value);
  };
  return (
    <ShifterFrame onShift={handleShift}>
      <div
        sx={[
          qu.flexHA().fJustify("between").minW(minWidth).h(36).fontSize(16),
          qu.bg(uiColors.selectorBg).bd(uiColors.clEdgeLine).cursor("pointer"),
          qu.rounded(2),
        ]}
      >
        <Icons.CaretLeft
          size={14}
          className={cz(qu.ml(-0.25), !canShiftLeft && qu.invisible())}
        />
        <div>{currentOption?.label}</div>
        <Icons.CaretRight
          size={14}
          className={cz(qu.mr(-0.25), !canShiftRight && qu.invisible())}
        />
      </div>
    </ShifterFrame>
  );
};
