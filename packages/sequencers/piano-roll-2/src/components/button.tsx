import { ComponentChildren } from "preact";
import { cz, qu } from "@/common/css-realm";

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
        qu.flexC().wh(40, 30).bg("#888").weight("bold").it,
        qu.color("#fff").cursor("pointer").it,
        active && qu.bg("#48c").it,
        disabled && qu.css({ opacity: 0.4 }).css({ pointerEvents: "none" }).it,
      )}
      onClick={onClick}
    >
      {text && <div class={qu.fontSize(9).it}>{text}</div>}
      {children}
    </div>
  );
};
