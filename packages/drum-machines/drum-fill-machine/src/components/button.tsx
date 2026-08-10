import { tz } from "@/common/setup-twind";
import { cx } from "@twind/core";
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
      class={cx(styles.base, active && "--active")}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};
const styles = {
  base: tz({
    "@apply": "bg-clControlBg bd-clControlEdge rounded-[2px] flex-c",
    "&.--active": {
      "@apply": "bg-clPrimary text-white",
    },
  }),
};
