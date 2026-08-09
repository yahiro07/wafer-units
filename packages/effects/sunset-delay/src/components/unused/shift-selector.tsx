import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";
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
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) => {
  const currentIndex = options.findIndex((option) => option.value === value);
  const currentOption = options[currentIndex];
  // const canShiftLeft = currentIndex > 0;
  // const canShiftRight = currentIndex < options.length - 1;

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
          qu.flexHA().fJustify("between").minW(60).h(30).fontSize(14),
          qu.bg("#ddd").cursor("pointer"),
        ]}
      >
        {/* <Icons.CaretLeft
          size={13}
          sx={[qu.ml(-0.75), !canShiftLeft && qu.invisible()]}
        /> */}
        <span>&lt;</span>
        <div>{currentOption?.label}</div>
        {/* <Icons.CaretRight
          size={13}
          sx={[qu.mr(-0.75), !canShiftRight && qu.invisible()]}
        /> */}
        <span>&gt;</span>
      </div>
    </ShifterFrame>
  );
};
