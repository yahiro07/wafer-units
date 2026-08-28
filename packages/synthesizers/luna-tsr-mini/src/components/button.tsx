import { cz } from "@/common/css-realm";
import { ComponentChildren } from "preact";

export const Button = ({
  children,
  onClick,
  height = 42,
  asr = 1.25,
  active,
}: {
  children?: ComponentChildren;
  onClick?: () => void;
  height?: number;
  active?: boolean;
  asr?: number;
}) => {
  const width = height * asr;
  return (
    <button
      onClick={onClick}
      class={cz(styles.base, active && "active")}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};
const styles = {
  base: cz(
    "bg-clButtonBg rounded-[2px] flex-c cursor-pointer hover:opacity-90",
    "text-clButtonText text-18px",
    "[&.active]:(bg-clPrimary text-black)",
  ),
};
