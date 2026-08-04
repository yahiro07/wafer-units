import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";

export const IconButton = ({
  className,
  children,
  disabled,
  onClick,
}: {
  className?: string;
  children: ComponentChildren;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      sx={[
        qu.css({ all: "unset" }).mt(3).bg("none").color("white"),
        qu.p(2).cursor("pointer"),
        disabled && qu.opacity(0.3).pointerEvents("none"),
        className,
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
