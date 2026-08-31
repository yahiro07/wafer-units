import { ComponentChildren } from "preact";
import { SelectorOption } from "@/utils/selector-option";
import { Icons } from "@/components/icons";
import { cz } from "@/common/css-realm";

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
          className={cz(styles.caret, !canShiftLeft && "hided")}
        />
        <div>{currentOption?.label}</div>
        <Icons.CaretRight
          className={cz(styles.caret, !canShiftRight && "hided")}
        />
      </div>
    </ShifterFrame>
  );
};
const styles = {
  base: cz(
    "flex-ha justify-between min-w-[60px] h-[40px]",
    "bg-clControlBg bd-clControlEdge cursor-pointer",
    "hover:opacity-80",
  ),
  caret: cz("font-[14px]", "[&.hided]:invisible"),
};
