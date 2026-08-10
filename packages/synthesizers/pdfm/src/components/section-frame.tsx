import { tz } from "@/utils/tz";
import { tx } from "@twind/core";
import { ComponentChildren } from "preact";

export const SectionFrame = ({
  className,
  contentClassName,
  header,
  children,
}: {
  className?: string;
  contentClassName?: string;
  header: string;
  children: ComponentChildren;
}) => {
  return (
    <div class={tx(styles.base, className)}>
      <div class={styles.headerRow}>
        <span>{header}</span>
      </div>
      <div class={tx(styles.contentRow, contentClassName)}>{children}</div>
    </div>
  );
};
const styles = {
  base: tz("flex-v rounded-[4px] overflow-hidden bg-clSectionBg", {
    border: "solid 1.5px theme('colors.clSectionEdge')",
  }),
  headerRow: tz(
    "flex-ha px-4 text-clPrimary h-[40px]",
    "bg-clSectionHeaderBg text-[18px]",
  ),
  contentRow: tz("flex-h justify-around pt-5 pb-3 px-2"),
};
