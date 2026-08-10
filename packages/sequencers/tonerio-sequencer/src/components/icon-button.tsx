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
        qu.mt(3).css({ border: "none" }).bg("none").color("#777"),
        qu.p(2).flexC().cursor("pointer"),
        disabled && qu.opacity(0.3).pointerEvents("none"),
        className,
      ]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
