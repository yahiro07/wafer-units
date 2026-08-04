import { qu } from "@/common/css-realm";
import { ComponentChildren } from "preact";

export const ButtonFrame = ({
  children,
  onClick,
}: {
  children: ComponentChildren;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} sx={qu.cursor("pointer")}>
      {children}
    </div>
  );
};
