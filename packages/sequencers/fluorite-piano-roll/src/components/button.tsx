import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";

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
      sx={[
        qu.flexC().wh(40, 30).bg("#888").weight("bold"),
        qu.color("#fff").cursor("pointer"),
        active && qu.bg("#48c"),
        disabled && qu.opacity(0.4).pointerEvents("none"),
      ]}
      onClick={onClick}
    >
      {text && <div sx={qu.fontSize(9)}>{text}</div>}
      {children}
    </div>
  );
};
