import { ComponentChildren, CSSProperties } from "preact";
import { cz, qu } from "@/common/css-realm";

export const Button = ({
  className,
  text,
  children,
  active,
  disabled,
  onClick,
  style,
}: {
  className?: string;
  text?: string;
  children?: ComponentChildren;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}) => {
  return (
    <div
      class={cz(
        qu.flexC().wh(40, 30).bg("#aaa").fontSize(14).it,
        qu.color("#fff").cursor("pointer").it,
        active && qu.bg("#48c").it,
        disabled && qu.opacity(0.4).pointerEvents("none").it,
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {text && <div class={qu.fontSize(9).it}>{text}</div>}
      {children}
    </div>
  );
};
