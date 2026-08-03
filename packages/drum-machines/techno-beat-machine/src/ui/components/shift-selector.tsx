import { ComponentChildren } from "preact";
import { cz, qu } from "@/ui/common/css-realm";
import { Icons } from "@/ui/common/icons";
import { SelectorOption } from "@/utils/selector-option";

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
  winWidth = 60,
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  winWidth?: number;
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
        class={cz(
          qu.flexHA().fJustify("between").minW(winWidth).h(36).fontSize(14).it,
          qu.bg("#ddd").color("#555").cursor("pointer").it,
        )}
      >
        <Icons.CaretLeft
          size={13}
          class={cz(qu.ml(-0.75).it, !canShiftLeft && qu.invisible().it)}
        />
        <div>{currentOption?.label}</div>
        <Icons.CaretRight
          size={13}
          class={cz(qu.mr(-0.75).it, !canShiftRight && qu.invisible().it)}
        />
      </div>
    </ShifterFrame>
  );
};
