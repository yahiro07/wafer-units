import { ComponentChildren } from "preact";
import { qu } from "@/common/css-realm";

export const NarrowButton = ({
  text,
  children,
  active,
  onClick,
}: {
  text?: string;
  children?: ComponentChildren;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      sx={[
        qu.flexC().wh(36, 16).bg("#888").bd("#444c").weight("bold"),
        qu.color("#fff").rounded(1).cursor("pointer"),
      ]}
      style={active ? { background: "#48c" } : undefined}
      onClick={onClick}
    >
      {text && <div sx={qu.fontSize(9)}>{text}</div>}
      {children}
    </div>
  );
};
