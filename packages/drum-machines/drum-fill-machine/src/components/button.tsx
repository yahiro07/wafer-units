import { tz } from "@/common/setup-twind";
import { cx } from "@twind/core";
import { ComponentChildren } from "preact";

export const Button = ({
  children,
  onClick,
  height = 40,
  asr = 1.6,
  active,
  activeBlink,
}: {
  children?: ComponentChildren;
  onClick?: () => void;
  height?: number;
  asr?: number;
  active?: boolean;
  activeBlink?: boolean;
}) => {
  const width = height * asr;
  return (
    <button
      onClick={onClick}
      class={cx(
        styles.base,
        active && "--active",
        activeBlink && "--active-blink",
      )}
      style={{ width, height }}
    >
      {children}
    </button>
  );
};
const styles = {
  base: tz(
    "bg-clControlBg bd-clControlEdge rounded-[2px] flex-c",
    "hover:opacity-80",
    {
      "&.--active": {
        "@apply": "bg-clPrimary text-white",
      },
      "&.--active-blink": {
        "@apply": "text-white",
        animation: "active-blink 0.3s ease-in-out infinite",
        "@keyframes active-blink": {
          "0%, 100%": { backgroundColor: "theme(colors.clPrimary)" },
          "50%": { backgroundColor: "theme(colors.clControlBg)" },
        },
      },
    },
  ),
};
