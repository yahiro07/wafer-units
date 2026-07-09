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
        qu.flexC().wh(36, 16).bg("#888").bd("#444c").weight("bold").cp().it,
        qu.color("#fff").rounded(1).it,
      )}
      style={active ? { background: "#48c" } : undefined}
      onClick={onClick}
    >
      {text && <div class={qu.fontSize(9).it}>{text}</div>}
      {children}
    </div>
  );
};
