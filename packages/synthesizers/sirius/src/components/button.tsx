import { tx } from "@twind/core";
import { ComponentChildren } from "preact";

export const Button = ({
  children,
  onClick,
  height = 40,
  asr = 1.6,
  active,
}: {
  children?: ComponentChildren;
  onClick?: () => void;
  height?: number;
  asr?: number;
  active?: boolean;
}) => {
  const width = height * asr;
  return (
    <button
      onClick={onClick}
      class={tx(styles.base, active && styles.active)}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};
const styles = {
  base: tx(
    "bg-clButtonBg bd-clSectionEdge rounded-[2px] flex-c",
    "hover:opacity-80",
  ),
  active: tx("!bg-clButtonActiveBg text-white"),
};
