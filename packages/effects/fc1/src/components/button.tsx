import { cz } from "@/utils/cz";
import { ComponentChildren } from "preact";

export const Button = ({
  className,
  children,
  onClick,
  height = 36,
  asr = 1.25,
  active,
  disabled,
}: {
  className?: string;
  children?: ComponentChildren;
  onClick?: () => void;
  height?: number;
  active?: boolean;
  disabled?: boolean;
  asr?: number;
}) => {
  const width = height * asr;
  return (
    <button
      onClick={onClick}
      class={cz(
        styles.base,
        active && "active",
        disabled && "disabled",
        className,
      )}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};
const styles = {
  base: cz(
    "bg-clButtonBg rounded-[2px] flex-c cursor-pointer hover:opacity-90",
    "text-white",
    "[&.active]:(bg-clPrimary)",
    "[&.disabled]:(opacity-40 pointer-events-none)",
  ),
};
