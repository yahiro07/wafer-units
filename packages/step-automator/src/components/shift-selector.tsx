import { Children } from "@/base/jsx-types";
import { SelectorOption } from "@/base/selector-option";
import { qlsx, qu } from "@/utils/qstyle-goober";

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
  className,
  options,
  value,
  onChange,
}: {
  className?: string;
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
          qu.flexHA().justify("between").minW(52).h(28).fontSize(14).cp(),
          qu.bd("#ddd").color("#fff"),
        )}
      >
        {/* <Icons.ArrowLeft
          size={20}
          className={clsx("ml-[-6px]", !canShiftLeft && "invisible")}
        /> */}
        <div>{currentOption?.label}</div>
        {/* <Icons.ArrowRight
          size={20}
          className={clsx("mr-[-6px]", !canShiftRight && "invisible")}
        /> */}
      </div>
    </ShifterFrame>
  );
};
