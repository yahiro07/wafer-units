import { ComponentChildren } from "preact";
import { SelectorOption } from "@/utils/selector-option";
import { tz } from "@/common/setup-twind";
import { Icons } from "@/common/icons";
import { tx } from "@twind/core";

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
  width,
}: {
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  width?: number;
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
      <div class={styles.base} style={{ width }}>
        <Icons.CaretLeft
          className={tx(styles.caret, !canShiftLeft && "--hidden")}
        />
        <div>{currentOption?.label}</div>
        <Icons.CaretRight
          className={tx(styles.caret, !canShiftRight && "--hidden")}
        />
      </div>
    </ShifterFrame>
  );
};
const styles = {
  base: tz(
    "flex-ha justify-between min-w-[60px] h-[40px]",
    "bg-clControlBg bd-clControlEdge cursor-pointer",
    "hover:opacity-80",
  ),
  caret: tz("font-[14px]", {
    "&.--hidden": {
      "@apply": "invisible",
    },
  }),
};
