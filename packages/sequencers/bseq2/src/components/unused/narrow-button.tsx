import { cz, qu } from "@/common/css-realm";
import { Children } from "@/utils/jsx-types";

export const NarrowButton = ({
  text,
  children,
  active,
  onClick,
}: {
  text?: string;
  children?: Children;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      class={cz(
        qu.flexC().wh(40, 20).bg("#ddd").weight("bold").cp(),
        active && qu.bg("#48c").color("#fff"),
      )}
      onClick={onClick}
    >
      {text && <div class={qu.fontSize(9)}>{text}</div>}
      {children}
    </div>
  );
};
