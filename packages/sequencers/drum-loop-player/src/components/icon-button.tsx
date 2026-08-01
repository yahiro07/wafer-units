import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";

export const IconButton = ({
  className,
  children,
  disabled,
  onClick,
}: {
  className?: string;
  children: ComponentChildren;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      class={cz(
        qu.css({ all: "unset" }).bg("none").color("#888").it,
        qu.cursor("pointer").flexC().it,
        disabled && qu.opacity(0.3).pointerEvents("none").it,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
