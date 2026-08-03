import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";

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
      class={cz(
        qu.flexC().wh(40, 20).bg("#ddd").weight("bold").cursor("pointer").it,
        active && qu.bg("#48c").color("#fff").it,
      )}
      onClick={onClick}
    >
      {text && <div class={qu.fontSize(9).it}>{text}</div>}
      {children}
    </div>
  );
};
