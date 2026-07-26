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
  width = 40,
}: {
  className?: string;
  text?: string;
  children?: ComponentChildren;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  width?: number;
}) => {
  return (
    <div
      class={cz(
        qu.flexC().wh(width, 30).bg("#aaa").fontSize(14).it,
        qu.color("#fff").cursor("pointer").it,
        active && qu.bg("#48c").it,
        disabled && qu.opacity(0.4).pointerEvents("none").it,
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {text && <div>{text}</div>}
      {children}
    </div>
  );
};
