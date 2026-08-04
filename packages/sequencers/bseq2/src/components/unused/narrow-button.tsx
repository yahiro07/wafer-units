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
        qu.flexC().wh(40, 20).bg("#ddd").weight("bold").cursor("pointer"),
        active && qu.bg("#48c").color("#fff"),
      ]}
      onClick={onClick}
    >
      {text && <div sx={qu.fontSize(9)}>{text}</div>}
      {children}
    </div>
  );
};
