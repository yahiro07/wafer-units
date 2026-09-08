import { ComponentChildren } from "preact";
import { cz } from "@/utils/cz";

export const Button = ({
  text,
  children,
  active,
  disabled,
  onClick,
}: {
  text?: string;
  children?: ComponentChildren;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      class={cz(
        "flex-c w-40px h-30px bg-#888 font-bold text-white cursor-pointer",
        active && "bg-#48c",
        disabled && "opacity-40 pointer-events-none",
      )}
      onClick={onClick}
    >
      {text && <div class="text-9px">{text}</div>}
      {children}
    </div>
  );
};
