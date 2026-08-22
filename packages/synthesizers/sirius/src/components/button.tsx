import { tx } from "@twind/core";
import { ComponentChildren } from "preact";

export const Button = ({
  children,
  onClick,
  height = 40,
  asr = 1.6,
}: {
  children?: ComponentChildren;
  onClick?: () => void;
  height?: number;
  asr?: number;
}) => {
  const width = height * asr;
  return (
    <button onClick={onClick} class={styles.base} style={{ width, height }}>
      {children}
    </button>
  );
};
const styles = {
  base: tx(
    "bg-clButtonBg bd-clSectionEdge rounded-[2px] flex-c",
    "hover:opacity-80",
  ),
};
