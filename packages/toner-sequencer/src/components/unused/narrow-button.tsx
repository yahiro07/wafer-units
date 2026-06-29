import { Children } from "@/common/jsx-types";
import { cx, qu } from "@/utils/qstyle-goober";

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
      class={cx(
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
