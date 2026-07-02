import { Icons } from "@/common/icons";
import { Children } from "@/utils/jsx-types";
import { qlsx, qu } from "@/utils/qstyle-goober";
import { SelectorOption } from "@/utils/selector-option";

export const ShifterFrame = ({
  children,
  onShift,
}: {
  children: Children;
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
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
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
        class={qlsx(
          qu.flexHA().justify("between").minW(60).h(30).fontSize(14).cp(),
          qu.bg("#ddd"),
        )}
      >
        <Icons.CaretLeft
          size={13}
          class={qlsx(qu.ml(-0.75), !canShiftLeft && qu.invisible())}
        />
        <div>{currentOption?.label}</div>
        <Icons.CaretRight
          size={13}
          class={qlsx(qu.mr(-0.75), !canShiftRight && qu.invisible())}
        />
      </div>
    </ShifterFrame>
  );
};
